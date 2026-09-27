import React from "react";
import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import {
  View,
  ActivityIndicator,
} from "react-native";

import Login from "../screens/Login";
import ClientDetails from "../screens/ClientDetails";
import GatewayDetails from "../screens/GatewayDetails";
import MeterDetails from "../screens/MeterDetails";
import TabsNavigator from "./TabsNavigator";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";


export type RootStackParamList = {

  LoginScreen: undefined;

  UserTabs: undefined;

  ClientDetails: {
    clientName: string;
  };

  GatewayDetails: {
    gatewayId: string;
  };

  MeterDetails: {
    meterId: string;
    gatewayNombre: string;
    nombre: string;
    device?: string;
    protocolo?: string;
    mac: string;
    estado: string;
    lectura: number;
    fecha: string;
    hora: string;
    goodReadsRatio?: number | null;
    readAttempts?: string | null;
    pulsos?: string | null;
  };

};


const Stack =
  createNativeStackNavigator<RootStackParamList>();


export default function StackNavigator() {

  const { colors } = useTheme();
  const { user, loading } = useAuth();


  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator
          size="large"
          color={colors.primary}
        />
      </View>
    );
  }


  return (

    <Stack.Navigator
      initialRouteName={user ? "UserTabs" : "LoginScreen"}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.cardBackground,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          color: colors.text,
        },
      }}
    >

      <Stack.Screen
        name="LoginScreen"
        component={Login}
        options={{
          headerShown: false,
        }}
      />


      <Stack.Screen
        name="UserTabs"
        component={TabsNavigator}
        options={{
          headerShown: false,
        }}
      />


      <Stack.Screen
        name="ClientDetails"
        component={ClientDetails}
        options={{
          title: "Cliente",
        }}
      />


      <Stack.Screen
        name="GatewayDetails"
        component={GatewayDetails}
        options={{
          title: "Gateway",
        }}
      />


      <Stack.Screen
        name="MeterDetails"
        component={MeterDetails}
        options={{
          title: "Medidor",
        }}
      />

    </Stack.Navigator>
  );
}