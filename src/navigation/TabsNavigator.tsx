import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Dashboard from "../screens/Home";
import Clients from "../screens/Clients";
import Alerts from "../screens/Alerts";
import Profile from "../screens/features/Profile";
import Settings from "../screens/features/Settings";

import { useTheme } from "../context/ThemeContext";

export type TabsParamList = {
  Home: undefined;
  Clients: undefined;
  Alerts: undefined;
  Profile: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<TabsParamList>();

export default function TabsNavigator() {

  const { colors, isDark } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,

        // Color del icono seleccionado
        tabBarActiveTintColor: colors.primary,

        // Color de los iconos no seleccionados
        tabBarInactiveTintColor: colors.textSecondary,

        // Fondo de la barra inferior
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        },

        // Color del texto de las pestañas
        tabBarLabelStyle: {
          color: colors.text,
        },

        // Fondo y texto del encabezado
        headerStyle: {
          backgroundColor: colors.background,
        },

        headerTintColor: colors.text,

        tabBarIcon: ({ color, size }) => {

          let iconName: keyof typeof Ionicons.glyphMap = "home";

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Clients") {
            iconName = "people";
          } else if (route.name === "Alerts") {
            iconName = "notifications";
          } else if (route.name === "Profile") {
            iconName = "person";
          } else if (route.name === "Settings") {
            iconName = "settings";
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}
    >

      <Tab.Screen
        name="Home"
        component={Dashboard}
        options={{ title: "Home" }}
      />

      <Tab.Screen
        name="Clients"
        component={Clients}
        options={{ title: "Clientes" }}
      />

      <Tab.Screen
        name="Alerts"
        component={Alerts}
        options={{ title: "Alertas" }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ title: "Perfil" }}
      />

      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ title: "Configuracion" }}
      />

    </Tab.Navigator>
  );
}