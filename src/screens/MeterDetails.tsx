import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

import StatusBadge from "../components/StatusBadge";

export default function MeterDetails({ route }: any) {
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
      estado: "Online",
      lectura: "1456.80 kWh",
      fecha: "03/09/2026",
      hora: "19:45",
    },
  };

  const medidor = medidores[meterId];

  const meterStatus =
    medidor.estado === "Online"
      ? "online"
      : "offline";

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {medidor.nombre}
      </Text>

      <Text style={styles.subtitle}>
        Información del medidor
      </Text>

      {/* Estado */}
      <View style={styles.statusCard}>
        <Text style={styles.statusLabel}>
          Estado actual
        </Text>

        <StatusBadge status={meterStatus} />
      </View>

      {/* Lectura */}
      <View style={styles.readingCard}>
        <Text style={styles.readingLabel}>
          Lectura actual
        </Text>

        <Text style={styles.reading}>
          {medidor.lectura}
        </Text>
      </View>

      {/* Información */}
      <Text style={styles.sectionTitle}>
        Información
      </Text>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>
            Gateway
          </Text>

          <Text style={styles.infoValue}>
            {medidor.gateway}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>
            MAC
          </Text>

          <Text style={styles.infoValue}>
            {medidor.mac}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>
            Última fecha
          </Text>

          <Text style={styles.infoValue}>
            {medidor.fecha}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>
            Última hora
          </Text>

          <Text style={styles.infoValue}>
            {medidor.hora}
          </Text>
        </View>
      </View>

      {/* Monitoreo */}
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
            : "El medidor no está reportando información actualmente."}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    padding: 20,
  },

  title: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#206291",
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 15,
    color: "#666",
    marginBottom: 20,
  },

  statusCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
  },

  statusLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },

  readingCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 25,
    elevation: 3,
  },

  readingLabel: {
    fontSize: 14,
    color: "#666",
  },

  reading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#206291",
    marginTop: 5,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },

  infoCard: {
    backgroundColor: "#fff",
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
    borderBottomColor: "#eee",
  },

  infoLabel: {
    fontSize: 14,
    color: "#666",
  },

  infoValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    maxWidth: "60%",
    textAlign: "right",
  },

  monitorCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 18,
    marginBottom: 30,
    elevation: 3,
  },

  monitorTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },

  monitorText: {
    fontSize: 15,
    color: "#666",
    lineHeight: 22,
  },
});