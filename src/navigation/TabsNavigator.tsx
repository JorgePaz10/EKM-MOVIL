import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Dashboard from "../screens/Dashboard";
import Clients from "../screens/Clients";
import Alerts from "../screens/Alerts";
import Profile from "../screens/features/Profile";
import Settings from "../screens/features/Settings";

export type TabsParamList = {
  Dashboard: undefined;
  Clients: undefined;
  Alerts: undefined;
  Profile: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<TabsParamList>();

export default function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarActiveTintColor: "#206291",
        tabBarInactiveTintColor: "gray",

        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";

          if (route.name === "Dashboard") {
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
        name="Dashboard"
        component={Dashboard}
        options={{ title: "Jutaru Control" }}
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
        options={{ title: "Configuración" }}
      />
    </Tab.Navigator>
  );
}