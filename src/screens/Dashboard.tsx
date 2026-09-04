import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function Dashboard() {
  // Datos de prueba
  const clientes = 12;
  const gateways = 18;
  const medidores = 240;

  const medidoresOnline = 228;
  const medidoresOffline = 8;
  const medidoresSinActualizacion = 4;

  return (
    <ScrollView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.title}>Jutaru Control</Text>
        <Text style={styles.subtitle}>
          Monitoreo de sistemas EKM
        </Text>
      </View>

      {/* Resumen general */}
      <Text style={styles.sectionTitle}>Resumen general</Text>

      <View style={styles.cardsContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Clientes</Text>
          <Text style={styles.cardValue}>{clientes}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Gateways</Text>
          <Text style={styles.cardValue}>{gateways}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Medidores</Text>
          <Text style={styles.cardValue}>{medidores}</Text>
        </View>
      </View>

      {/* Estado de los medidores */}
      <Text style={styles.sectionTitle}>Estado de medidores</Text>

      <View style={styles.statusCard}>
        <View style={styles.statusRow}>
          <View style={styles.statusIndicatorOnline} />
          <Text style={styles.statusText}>Online</Text>
          <Text style={styles.statusValue}>
            {medidoresOnline}
          </Text>
        </View>

        <View style={styles.statusRow}>
          <View style={styles.statusIndicatorOffline} />
          <Text style={styles.statusText}>Offline</Text>
          <Text style={styles.statusValue}>
            {medidoresOffline}
          </Text>
        </View>

        <View style={styles.statusRow}>
          <View style={styles.statusIndicatorWarning} />
          <Text style={styles.statusText}>
            Sin actualización
          </Text>
          <Text style={styles.statusValue}>
            {medidoresSinActualizacion}
          </Text>
        </View>
      </View>

      {/* Incidencias */}
      <Text style={styles.sectionTitle}>Incidencias</Text>

      <View style={styles.alertCard}>
        <Text style={styles.alertTitle}>
          Atención requerida
        </Text>

        <Text style={styles.alertText}>
          Hay {medidoresOffline} medidores offline y{" "}
          {medidoresSinActualizacion} sin actualización.
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

  header: {
    marginBottom: 25,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#206291",
  },

  subtitle: {
    fontSize: 15,
    color: "#666",
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
    marginTop: 10,
  },

  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    width: "31%",
    elevation: 3,
  },

  cardTitle: {
    fontSize: 13,
    color: "#666",
    marginBottom: 8,
  },

  cardValue: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#206291",
  },

  statusCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    elevation: 3,
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  statusIndicatorOnline: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "green",
    marginRight: 10,
  },

  statusIndicatorOffline: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "red",
    marginRight: 10,
  },

  statusIndicatorWarning: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "orange",
    marginRight: 10,
  },

  statusText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },

  statusValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },

  alertCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 30,
    elevation: 3,
  },

  alertTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },

  alertText: {
    fontSize: 15,
    color: "#666",
    lineHeight: 22,
  },
});