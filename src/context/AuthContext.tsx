import React, { createContext, useContext, useState } from "react"

//1. tipado del objeto principal del contexto
 type User = {
    email: string;
    authToken? : string;
    sesionToken? : string;
    role? : string;
 } | null

 type AuthContextType ={
    user: User | null;
    logout : ()=> {};
    login : (email: string) => boolean;
 }


//2. Crear el contexto
const AuthContext = createContext<AuthContextType | null>(null);

//3. Creacion del provedier, es el medo por el cual manejados el estado
//   de otras pantallas

export const AuthProvider = ({children}: {children:React.ReactNode}) => {

    const [user, setUser] = useState<User>(null);

    const login = (email: string):boolean => {
        const isAllowed = email.endsWith('.edu');
        if (isAllowed){
            setUser({email});
        }
        return isAllowed;
    };

    const logout = () =>{
        return '';
    };

    return(
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

// 4. Creacion de un hook personalizado, exposicion de contextoa componente de la 
//   aplicacion

export const useAuth = ()=> {
    const context = useContext (AuthContext);
    if(!context) throw new Error("useAuth debe ser utilizado dentro de AuthProvider")
    return context;
}