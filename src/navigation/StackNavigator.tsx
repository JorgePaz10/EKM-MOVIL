import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../screens/Login";
import ClientDetails from "../screens/ClientDetails";
import GatewayDetails from "../screens/GatewayDetails";
import MeterDetails from "../screens/MeterDetails";
import TabsNavigator from "./TabsNavigator";

export type RootStackParamList = {
  LoginScreen: undefined;
  UserTabs: undefined;
  ClientDetails: { clientId: string };
  GatewayDetails: { gatewayId: string };
  MeterDetails: { meterId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={Login}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="UserTabs"
        component={TabsNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ClientDetails"
        component={ClientDetails}
        options={{ title: "Cliente" }}
      />

      <Stack.Screen
        name="GatewayDetails"
        component={GatewayDetails}
        options={{ title: "Gateway" }}
      />

      <Stack.Screen
        name="MeterDetails"
        component={MeterDetails}
        options={{ title: "Medidor" }}
      />
    </Stack.Navigator>
  );
}