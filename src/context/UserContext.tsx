import React, { createContext, useContext, useState } from "react";

type UserContextType = {
  nombre: string;
  telefono: string;
  setNombre: (nombre: string) => void;
  setTelefono: (telefono: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [nombre, setNombre] = useState("Jorge Paz");
  const [telefono, setTelefono] = useState("");

  return (
    <UserContext.Provider
      value={{
        nombre,
        telefono,
        setNombre,
        setTelefono,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser debe utilizarse dentro de UserProvider");
  }

  return context;
}