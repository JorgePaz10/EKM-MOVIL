import React, { createContext, useContext, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { supabase } from "../utils/supabase";

WebBrowser.maybeCompleteAuthSession();

// 1. Tipado del usuario
type User = {
    email: string;
    authToken?: string;
    sesionToken?: string;
    role?: string;
} | null;

// 2. Tipado del contexto
type AuthContextType = {
    user: User;
    logout: () => void;
    login: (email: string, password: string) => Promise<boolean>;
    loginWithGoogle: () => Promise<boolean>;
};

// 3. Crear contexto
const AuthContext = createContext<AuthContextType | null>(null);

// 4. Provider
export const AuthProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {

    const [user, setUser] = useState<User>(null);

    // =========================
    // LOGIN NORMAL CON SUPABASE
    // =========================
    const login = async (
        email: string,
        password: string
    ): Promise<boolean> => {

        // 1. Iniciar sesión en Supabase Auth
        const { data, error } =
            await supabase.auth.signInWithPassword({
                email: email.trim(),
                password: password,
            });

        // Si las credenciales son incorrectas
        if (error || !data.user) {
            console.log("Error de login:", error?.message);
            return false;
        }

        // Obtener correo del usuario autenticado
        const userEmail = data.user.email;

        if (!userEmail) {
            await supabase.auth.signOut();
            return false;
        }

        // =========================
        // COMPROBAR AUTORIZACIÓN
        // =========================

        const {
            data: usuario,
            error: usuarioError,
        } = await supabase
            .from("usuarios")
            .select("nombre, rol, autorizado")
            .eq("email", userEmail)
            .single();

        // Error consultando la tabla
        if (usuarioError) {
            console.log(
                "Error consultando autorización:",
                usuarioError.message
            );

            await supabase.auth.signOut();
            return false;
        }

        // Usuario existe pero no está autorizado
        if (!usuario.autorizado) {
            console.log("Usuario no autorizado");

            await supabase.auth.signOut();
            return false;
        }

        // =========================
        // GUARDAR USUARIO
        // =========================

        setUser({
            email: userEmail,
            authToken: data.session?.access_token,
            sesionToken: data.session?.refresh_token,
            role: usuario.rol,
        });

        console.log("Login autorizado:", userEmail);
        console.log("Rol:", usuario.rol);

        return true;
    };

    // =========================
    // LOGIN CON GOOGLE
    // =========================
    const loginWithGoogle = async (): Promise<boolean> => {

        const redirectUrl = AuthSession.makeRedirectUri({
            scheme: "jutarucontrol",
            path: "auth/callback",
        });

        console.log("REDIRECT URL:", redirectUrl);

        const { data, error } =
            await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: redirectUrl,
                    skipBrowserRedirect: true,
                },
            });

        if (error || !data?.url) {
            console.log(
                "Error iniciando OAuth:",
                error
            );

            return false;
        }

        const result =
            await WebBrowser.openAuthSessionAsync(
                data.url,
                redirectUrl
            );

        if (
            result.type === "success" &&
            result.url
        ) {

            const url =
                new URL(
                    result.url.replace("#", "?")
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
                access_token &&
                refresh_token
            ) {

                const {
                    data: sessionData,
                    error: sessionError,
                } =
                    await supabase.auth.setSession({
                        access_token,
                        refresh_token,
                    });

                if (
                    sessionError ||
                    !sessionData.user?.email
                ) {

                    console.log(
                        "Error estableciendo sesión:",
                        sessionError
                    );

                    return false;
                }

                setUser({
                    email:
                        sessionData.user.email,
                });

                return true;
            }
        }

        return false;
    };

    // =========================
    // CERRAR SESIÓN
    // =========================
    const logout = async () => {

        await supabase.auth.signOut();

        setUser(null);
    };

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

// 5. Hook personalizado
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