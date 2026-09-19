import React, {
  createContext,
  useContext,
  useState,
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


    // Credenciales incorrectas
    if (
      error ||
      !data.user
    ) {

      console.log(
        "Error de login:",
        error?.message
      );

      return false;
    }


    const userEmail =
      data.user.email;


    if (!userEmail) {

      await supabase.auth.signOut();

      return false;
    }


    console.log(
      "CORREO LOGIN:",
      userEmail
    );


    // Buscar usuario en la tabla usuarios
    const {
      data: usuario,
      error: usuarioError,
    } =
      await supabase
        .from("usuarios")
        .select(
          "nombre, rol, autorizado"
        )
        .eq(
          "email",
          userEmail
        )
        .single();


    console.log(
      "USUARIO BD:",
      usuario
    );

    console.log(
      "ERROR BD:",
      usuarioError
    );


    // Usuario no registrado
    if (
      usuarioError ||
      !usuario
    ) {

      console.log(
        "Usuario no registrado."
      );

      await supabase.auth.signOut();

      return false;
    }


    // Usuario no autorizado
    if (
      usuario.autorizado !== true
    ) {

      console.log(
        "Usuario no autorizado."
      );

      await supabase.auth.signOut();

      return false;
    }


    // Guardar usuario
    setUser({

      email: userEmail,

      nombre:
        usuario.nombre,

      authToken:
        data.session?.access_token,

      sesionToken:
        data.session?.refresh_token,

      role:
        usuario.rol,
    });


    console.log(
      "Login autorizado:"
    );

    console.log(
      "Correo:",
      userEmail
    );

    console.log(
      "Nombre:",
      usuario.nombre
    );

    console.log(
      "Rol:",
      usuario.rol
    );


    return true;
  };


  // ========================================
  // LOGIN CON GOOGLE
  // ========================================

  const loginWithGoogle =
    async (): Promise<boolean> => {

    const redirectUrl =
      AuthSession.makeRedirectUri({
        scheme: "jutarucontrol",
        path: "auth/callback",
      });


    console.log(
      "REDIRECT URL:",
      redirectUrl
    );


    // Iniciar OAuth
    const {
      data,
      error,
    } =
      await supabase.auth.signInWithOAuth({
        provider: "google",

        options: {

          redirectTo:
            redirectUrl,

          skipBrowserRedirect:
            true,
        },
      });


    if (
      error ||
      !data?.url
    ) {

      console.log(
        "Error iniciando OAuth:",
        error?.message
      );

      return false;
    }


    // Abrir Google
    const result =
      await WebBrowser.openAuthSessionAsync(
        data.url,
        redirectUrl
      );


    if (
      result.type !== "success" ||
      !result.url
    ) {

      console.log(
        "Login Google cancelado."
      );

      return false;
    }


    // Obtener respuesta
    const url =
      new URL(
        result.url.replace(
          "#",
          "?"
        )
      );


    const access_token =
      url.searchParams.get(
        "access_token"
      );

    const refresh_token =
      url.searchParams.get(
        "refresh_token"
      );


    if (
      !access_token ||
      !refresh_token
    ) {

      console.log(
        "No se recibieron tokens."
      );

      return false;
    }


    // Crear sesión
    const {
      data: sessionData,
      error: sessionError,
    } =
      await supabase.auth.setSession({
        access_token:
          access_token,

        refresh_token:
          refresh_token,
      });


    if (
      sessionError ||
      !sessionData.user?.email
    ) {

      console.log(
        "Error estableciendo sesión:",
        sessionError?.message
      );

      return false;
    }


    // Correo obtenido de Google
    const userEmail =
      sessionData.user.email;


    console.log(
      "CORREO GOOGLE:",
      userEmail
    );


    // ======================================
    // BUSCAR EN usuarios
    // ======================================

    const {
      data: usuario,
      error: usuarioError,
    } =
      await supabase
        .from("usuarios")
        .select(
          "nombre, rol, autorizado"
        )
        .eq(
          "email",
          userEmail
        )
        .single();


    console.log(
      "USUARIO GOOGLE EN BD:",
      usuario
    );

    console.log(
      "ERROR GOOGLE BD:",
      usuarioError
    );


    // No existe en el sistema
    if (
      usuarioError ||
      !usuario
    ) {

      console.log(
        "Correo Google no registrado en Jutaru Control."
      );

      await supabase.auth.signOut();

      setUser(null);

      return false;
    }


    // Existe pero no está autorizado
    if (
      usuario.autorizado !== true
    ) {

      console.log(
        "Correo Google registrado pero no autorizado."
      );

      await supabase.auth.signOut();

      setUser(null);

      return false;
    }


    // ======================================
    // USUARIO GOOGLE AUTORIZADO
    // ======================================

    setUser({

      email:
        userEmail,

      nombre:
        usuario.nombre,

      authToken:
        sessionData
          .session
          ?.access_token,

      sesionToken:
        sessionData
          .session
          ?.refresh_token,

      role:
        usuario.rol,
    });


    console.log(
      "Google Login autorizado."
    );

    console.log(
      "Correo:",
      userEmail
    );

    console.log(
      "Nombre:",
      usuario.nombre
    );

    console.log(
      "Rol:",
      usuario.rol
    );


    return true;
  };


  // ========================================
  // CERRAR SESIÓN
  // ========================================

  const logout =
    async (): Promise<void> => {

    await supabase.auth.signOut();

    setUser(null);

    console.log(
      "Sesión cerrada."
    );
  };


  // ========================================
  // PROVIDER
  // ========================================

  return (
    <AuthContext.Provider
      value={{
        user,
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

  const context =
    useContext(AuthContext);


  if (!context) {

    throw new Error(
      "useAuth debe ser utilizado dentro de AuthProvider"
    );
  }


  return context;
};