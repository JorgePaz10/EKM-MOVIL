import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

import StatusBadge from "../components/StatusBadge";
import { useTheme } from "../context/ThemeContext";

export default function MeterDetails({ route }: any) {
  const { colors } = useTheme();
  const styles = crearEstilos(colors);

  const { meterId } = route.params;

  const medidores: any = {
    "1": {
      nombre: "Medidor 001",
      gateway: "Gateway Sucursal Principal",
      mac: "00:1A:2B:3C:4D:01",
      estado: "Online",
      lectura: "1250.45 kWh",
      fecha: "03/09/2026",
      hora: "19:45",
    },
    "2": {
      nombre: "Medidor 002",
      gateway: "Gateway Sucursal Principal",
      mac: "00:1A:2B:3C:4D:02",
      estado: "Online",
      lectura: "980.20 kWh",
      fecha: "03/09/2026",
      hora: "19:45",
    },
    "3": {
      nombre: "Medidor 003",
      gateway: "Gateway Sucursal Principal",
      mac: "00:1A:2B:3C:4D:03",
      estado: "Offline",
      lectura: "Sin lectura",
      fecha: "03/09/2026",
      hora: "18:20",
    },
    "4": {
      nombre: "Medidor 004",
      gateway: "Gateway Sucursal Principal",
      mac: "00:1A:2B:3C:4D:04",
      estado: "Sin actualización",
      lectura: "1456.80 kWh",
      fecha: "03/09/2026",
      hora: "19:00",
    },
  };

  const medidor = medidores[meterId];

  const meterStatus =
    medidor.estado === "Online"
      ? "online"
      : medidor.estado === "Offline"
        ? "offline"
        : "warning";

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {medidor.nombre}
      </Text>

      <Text style={styles.subtitle}>
        Información del medidor
      </Text>

      <View style={styles.statusCard}>
        <Text style={styles.statusLabel}>
          Estado actual
        </Text>
        <StatusBadge status={meterStatus} />
      </View>

      <View style={styles.readingCard}>
        <Text style={styles.readingLabel}>
          Lectura actual
        </Text>
        <Text style={styles.reading}>
          {medidor.lectura}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>
        Información
      </Text>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Gateway</Text>
          <Text style={styles.infoValue}>{medidor.gateway}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>MAC</Text>
          <Text style={styles.infoValue}>{medidor.mac}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Última fecha</Text>
          <Text style={styles.infoValue}>{medidor.fecha}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Última hora</Text>
          <Text style={styles.infoValue}>{medidor.hora}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>
        Monitoreo
      </Text>

      <View style={styles.monitorCard}>
        <Text style={styles.monitorTitle}>
          Estado de comunicación
        </Text>
        <Text style={styles.monitorText}>
          {medidor.estado === "Online"
            ? "El medidor está reportando información correctamente."
            : medidor.estado === "Offline"
              ? "El medidor no está reportando información actualmente."
              : "El medidor tiene información, pero no se ha actualizado recientemente."}
        </Text>
      </View>
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
    fontSize: 27,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  statusCard: {
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
  },
  statusLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  readingCard: {
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 10,
    padding: 20,
    marginBottom: 25,
    elevation: 3,
  },
  readingLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  reading: {
    fontSize: 30,
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
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text,
    maxWidth: "60%",
    textAlign: "right",
  },
  monitorCard: {
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 10,
    padding: 18,
    marginBottom: 30,
    elevation: 3,
  },
  monitorTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8,
  },
  monitorText: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
  },
});