import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

import GatewayCard from "../components/GatewayCard";
import MeterCard from "../components/MeterCard";
import StatusBadge from "../components/StatusBadge";
import { useTheme } from "../context/ThemeContext";

export default function GatewayDetails({ route, navigation }: any) {
  const { colors } = useTheme();
  const styles = crearEstilos(colors);

  const { gatewayId } = route.params;

  const gateways: any = {
    "1": {
      nombre: "Gateway Sucursal Principal",
      cliente: "Supermercados Del Corral",
      ubicacion: "Sucursal Principal",
      estado: "Online",
      medidores: 35,
    },
    "2": {
      nombre: "Gateway Sucursal Norte",
      cliente: "Supermercados Del Corral",
      ubicacion: "Sucursal Norte",
      estado: "Online",
      medidores: 25,
    },
    "3": {
      nombre: "Gateway Sucursal Sur",
      cliente: "Supermercados Del Corral",
      ubicacion: "Sucursal Sur",
      estado: "Offline",
      medidores: 25,
    },
  };

  const medidores = [
    { id: "1", nombre: "Medidor 001", estado: "Online", lectura: 1250.45 },
    { id: "2", nombre: "Medidor 002", estado: "Online", lectura: 980.2 },
    { id: "3", nombre: "Medidor 003", estado: "Offline", lectura: 0 },
    { id: "4", nombre: "Medidor 004", estado: "Sin actualización", lectura: 1456.8 },
  ];

  const gateway = gateways[gatewayId];

  const gatewayStatus =
    gateway.estado === "Online"
      ? "online"
      : gateway.estado === "Offline"
        ? "offline"
        : "warning";

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {gateway.nombre}
      </Text>

      <Text style={styles.subtitle}>
        Información del gateway
      </Text>

      <GatewayCard
        name={gateway.nombre}
        meters={gateway.medidores}
        status={gatewayStatus}
      />

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Cliente</Text>
          <Text style={styles.infoValue}>{gateway.cliente}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Ubicación</Text>
          <Text style={styles.infoValue}>{gateway.ubicacion}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Estado</Text>
          <StatusBadge status={gatewayStatus} />
        </View>
      </View>

      <Text style={styles.sectionTitle}>
        Medidores
      </Text>

      {medidores.map((medidor) => (
        <MeterCard
          key={medidor.id}
          name={medidor.nombre}
          consumption={medidor.lectura}
          status={
            medidor.estado === "Online"
              ? "online"
              : medidor.estado === "Offline"
                ? "offline"
                : "warning"
          }
          onPress={() =>
            navigation.navigate("MeterDetails", {
              meterId: medidor.id,
            })
          }
        />
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
  infoCard: {
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 10,
    padding: 18,
    marginBottom: 25,
    elevation: 3,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoLabel: {
    fontSize: 15,
    color: colors.textSecondary,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.text,
    maxWidth: "60%",
    textAlign: "right",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 12,
  },
});