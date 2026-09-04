import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default function GatewayDetails({ route, navigation }: any) {
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

  const gateway = gateways[gatewayId];

  const medidores = [
    {
      id: "1",
      nombre: "Medidor 001",
      estado: "Online",
      lectura: "1250.45 kWh",
    },
    {
      id: "2",
      nombre: "Medidor 002",
      estado: "Online",
      lectura: "980.20 kWh",
    },
    {
      id: "3",
      nombre: "Medidor 003",
      estado: "Offline",
      lectura: "Sin lectura",
    },
    {
      id: "4",
      nombre: "Medidor 004",
      estado: "Online",
      lectura: "1456.80 kWh",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{gateway.nombre}</Text>

      <Text style={styles.subtitle}>
        Información del gateway
      </Text>

      {/* Información general */}
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
          <Text style={styles.infoLabel}>Medidores</Text>
          <Text style={styles.infoValue}>{gateway.medidores}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Estado</Text>

          <Text
            style={[
              styles.status,
              gateway.estado === "Online"
                ? styles.online
                : styles.offline,
            ]}
          >
            ● {gateway.estado}
          </Text>
        </View>
      </View>

      {/* Medidores */}
      <Text style={styles.sectionTitle}>
        Medidores
      </Text>

      {medidores.map((medidor) => (
        <TouchableOpacity
          key={medidor.id}
          style={styles.meterCard}
          onPress={() =>
            navigation.navigate("MeterDetails", {
              meterId: medidor.id,
            })
          }
        >
          <View style={styles.meterHeader}>
            <Text style={styles.meterName}>
              {medidor.nombre}
            </Text>

            <Text
              style={[
                styles.meterStatus,
                medidor.estado === "Online"
                  ? styles.online
                  : styles.offline,
              ]}
            >
              ● {medidor.estado}
            </Text>
          </View>

          <Text style={styles.readingLabel}>
            Lectura actual
          </Text>

          <Text style={styles.reading}>
            {medidor.lectura}
          </Text>

          <Text style={styles.detailsText}>
            Ver medidor →
          </Text>
        </TouchableOpacity>
      ))}
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
    fontSize: 26,
    fontWeight: "bold",
    color: "#206291",
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 15,
    color: "#666",
    marginBottom: 20,
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
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  infoLabel: {
    fontSize: 15,
    color: "#666",
  },

  infoValue: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
    maxWidth: "60%",
    textAlign: "right",
  },

  status: {
    fontSize: 15,
    fontWeight: "bold",
  },

  online: {
    color: "green",
  },

  offline: {
    color: "red",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },

  meterCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 18,
    marginBottom: 15,
    elevation: 3,
  },

  meterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  meterName: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#333",
  },

  meterStatus: {
    fontSize: 13,
    fontWeight: "bold",
  },

  readingLabel: {
    fontSize: 13,
    color: "#666",
  },

  reading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#206291",
    marginTop: 4,
  },

  detailsText: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: "bold",
    color: "#206291",
  },
});