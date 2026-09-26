import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Dashboard from "../screens/Home";
import Clients from "../screens/Clients";
import Alerts from "../screens/Alerts";
import Profile from "../screens/features/Profile";
import Settings from "../screens/features/Settings";

import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations/translations";

export type TabsParamList = {
  Home: undefined;
  Clients: undefined;
  Alerts: undefined;
  Profile: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<TabsParamList>();

export default function TabsNavigator() {

  const { colors } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,

        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,

        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        },

        tabBarLabelStyle: {
          color: colors.text,
        },

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
        options={{ title: t.tabHome }}
      />

      <Tab.Screen
        name="Clients"
        component={Clients}
        options={{ title: t.tabClients }}
      />

      <Tab.Screen
        name="Alerts"
        component={Alerts}
        options={{ title: t.tabAlerts }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ title: t.tabProfile }}
      />

      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ title: t.tabSettings }}
      />

    </Tab.Navigator>
  );
}