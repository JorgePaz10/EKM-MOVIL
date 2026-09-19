import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { useTheme } from "../context/ThemeContext";

export default function ClientDetails({ route, navigation }: any) {
  const { colors } = useTheme();
  const styles = crearEstilos(colors);

  const { clientId } = route.params;

  const clientes: any = {
    "1": { nombre: "Supermercados Del Corral", gateways: 3, medidores: 85 },
    "2": { nombre: "Empresa ABC", gateways: 2, medidores: 60 },
    "3": { nombre: "Corporación XYZ", gateways: 4, medidores: 95 },
  };

  const cliente = clientes[clientId];

  const gateways = [
    { id: "1", nombre: "Gateway Sucursal Principal", medidores: 35, estado: "Online" },
    { id: "2", nombre: "Gateway Sucursal Norte", medidores: 25, estado: "Online" },
    { id: "3", nombre: "Gateway Sucursal Sur", medidores: 25, estado: "Offline" },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{cliente.nombre}</Text>

      <Text style={styles.subtitle}>
        Información general del cliente
      </Text>

      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Gateways</Text>
          <Text style={styles.summaryValue}>{cliente.gateways}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Medidores</Text>
          <Text style={styles.summaryValue}>{cliente.medidores}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>
        Gateways
      </Text>

      {gateways.map((gateway) => (
        <TouchableOpacity
          key={gateway.id}
          style={styles.gatewayCard}
          onPress={() =>
            navigation.navigate("GatewayDetails", {
              gatewayId: gateway.id,
            })
          }
        >
          <Text style={styles.gatewayName}>
            {gateway.nombre}
          </Text>

          <Text style={styles.gatewayInfo}>
            Medidores: {gateway.medidores}
          </Text>

          <Text
            style={[
              styles.gatewayStatus,
              gateway.estado === "Online"
                ? styles.online
                : styles.offline,
            ]}
          >
            ● {gateway.estado}
          </Text>

          <Text style={styles.detailsText}>
            Ver gateway →
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const crearEstilos = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  summaryCard: {
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 10,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 25,
    elevation: 3,
  },
  summaryItem: {
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 12,
  },
  gatewayCard: {
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 10,
    padding: 18,
    marginBottom: 15,
    elevation: 3,
  },
  gatewayName: {
    fontSize: 17,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8,
  },
  gatewayInfo: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  gatewayStatus: {
    fontSize: 14,
    fontWeight: "bold",
  },
  online: {
    color: "green",
  },
  offline: {
    color: "red",
  },
  detailsText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: colors.primary,
  },
});