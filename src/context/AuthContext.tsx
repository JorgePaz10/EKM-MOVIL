import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";

import { supabase } from "../lib/supabase";

WebBrowser.maybeCompleteAuthSession();


// ==========================================
// 1. TIPO DEL USUARIO
// ==========================================

type User = {
  email: string;
  nombre?: string;
  authToken?: string;
  sesionToken?: string;
  role?: string;
} | null;


// ==========================================
// 2. TIPO DEL CONTEXTO
// ==========================================

type AuthContextType = {
  user: User;
  loading: boolean;

  logout: () => Promise<void>;

  login: (
    email: string,
    password: string
  ) => Promise<boolean>;

  loginWithGoogle: () => Promise<boolean>;
};


// ==========================================
// 3. CREAR CONTEXTO
// ==========================================

const AuthContext =
  createContext<AuthContextType | null>(null);


// ==========================================
// 4. AUTH PROVIDER
// ==========================================

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const [user, setUser] =
    useState<User>(null);

  const [loading, setLoading] =
    useState<boolean>(true);


  // ========================================
  // BUSCAR PERFIL EN LA TABLA usuarios
  // ========================================

  const cargarPerfil = async (
    email: string,
    accessToken?: string,
    refreshToken?: string
  ): Promise<boolean> => {

    const {
      data: usuario,
      error: usuarioError,
    } =
      await supabase
        .from("usuarios")
        .select("nombre, rol, autorizado")
        .eq("email", email)
        .single();

    if (usuarioError || !usuario) {
      console.log("Usuario no registrado.");
      await supabase.auth.signOut();
      setUser(null);
      return false;
    }

    if (usuario.autorizado !== true) {
      console.log("Usuario no autorizado.");
      await supabase.auth.signOut();
      setUser(null);
      return false;
    }

    setUser({
      email: email,
      nombre: usuario.nombre,
      authToken: accessToken,
      sesionToken: refreshToken,
      role: usuario.rol,
    });

    return true;
  };


  // ========================================
  // VERIFICAR SESIÓN GUARDADA AL ABRIR LA APP
  // ========================================

  useEffect(() => {

    const restaurarSesion = async () => {

      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.log("Error obteniendo sesión guardada:", error.message);
      }

      if (session?.user?.email) {

        console.log("Sesión encontrada para:", session.user.email);

        await cargarPerfil(
          session.user.email,
          session.access_token,
          session.refresh_token
        );

      } else {
        console.log("No había sesión guardada.");
      }

      setLoading(false);
    };

    restaurarSesion();


    const { data: listener } =
      supabase.auth.onAuthStateChange((event, session) => {

        console.log("Auth state change:", event);

        if (event === "SIGNED_OUT" || !session) {
          setUser(null);
        }
      });

    return () => {
      listener.subscription.unsubscribe();
    };

  }, []);


  // ========================================
  // LOGIN NORMAL
  // ========================================

  const login = async (
    email: string,
    password: string
  ): Promise<boolean> => {

    const {
      data,
      error,
    } =
      await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

    if (error || !data.user) {
      console.log("Error de login:", error?.message);
      return false;
    }

    const userEmail = data.user.email;

    if (!userEmail) {
      await supabase.auth.signOut();
      return false;
    }

    return await cargarPerfil(
      userEmail,
      data.session?.access_token,
      data.session?.refresh_token
    );
  };


  // ========================================
  // LOGIN CON GOOGLE
  // ========================================

  const loginWithGoogle =
    async (): Promise<boolean> => {

    const redirectUrl =
      AuthSession.makeRedirectUri({
        scheme: "ekmjutaru",
        path: "auth/callback",
      });

    console.log("REDIRECT URL:", redirectUrl);

    const {
      data,
      error,
    } =
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
          skipBrowserRedirect: true,
        },
      });

    if (error || !data?.url) {
      console.log("Error iniciando OAuth:", error?.message);
      return false;
    }

    const result =
      await WebBrowser.openAuthSessionAsync(
        data.url,
        redirectUrl
      );

    if (result.type !== "success" || !result.url) {
      console.log("Login Google cancelado.");
      return false;
    }

    const url = new URL(result.url.replace("#", "?"));

    const access_token = url.searchParams.get("access_token");
    const refresh_token = url.searchParams.get("refresh_token");

    if (!access_token || !refresh_token) {
      console.log("No se recibieron tokens.");
      return false;
    }

    const {
      data: sessionData,
      error: sessionError,
    } =
      await supabase.auth.setSession({
        access_token,
        refresh_token,
      });

    if (sessionError || !sessionData.user?.email) {
      console.log("Error estableciendo sesión:", sessionError?.message);
      return false;
    }

    const userEmail = sessionData.user.email;

    console.log("CORREO GOOGLE:", userEmail);

    return await cargarPerfil(
      userEmail,
      sessionData.session?.access_token,
      sessionData.session?.refresh_token
    );
  };


  // ========================================
  // CERRAR SESIÓN
  // ========================================

  const logout = async (): Promise<void> => {
    try {

      const { error } = await supabase.auth.signOut();

      if (error) {
        console.log("Error cerrando sesión en Supabase:", error.message);
      }

      setUser(null);

      console.log("Sesión cerrada.");

    } catch (error) {
      console.log("Error cerrando sesión:", error);
      setUser(null);
    }
  };


  // ========================================
  // PROVIDER
  // ========================================

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        loginWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


// ==========================================
// 5. HOOK useAuth
// ==========================================

export const useAuth = () => {

  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth debe ser utilizado dentro de AuthProvider"
    );
  }

  return context;
};