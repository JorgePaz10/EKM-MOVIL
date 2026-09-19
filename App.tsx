import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import StackNavigator from "./src/navigation/StackNavigator";
import { UserProvider } from "./src/context/UserContext";
import { ThemeProvider } from "./src/context/ThemeContext";
import { AuthProvider } from "./src/context/AuthContext";
import { LanguageProvider } from "./src/context/LanguageContext";

export default function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <ThemeProvider>
          <LanguageProvider>
            <NavigationContainer>
              <StackNavigator />
            </NavigationContainer>
          </LanguageProvider>
        </ThemeProvider>
      </UserProvider>
    </AuthProvider>
  );
}