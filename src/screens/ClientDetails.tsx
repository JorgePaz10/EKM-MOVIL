import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default function ClientDetails({ route, navigation }: any) {
  const { clientId } = route.params;

  const clientes: any = {
    "1": {
      nombre: "Supermercados Del Corral",
      gateways: 3,
      medidores: 85,
    },
    "2": {
      nombre: "Empresa ABC",
      gateways: 2,
      medidores: 60,
    },
    "3": {
      nombre: "Corporación XYZ",
      gateways: 4,
      medidores: 95,
    },
  };

  const cliente = clientes[clientId];

  const gateways = [
    {
      id: "1",
      nombre: "Gateway Sucursal Principal",
      medidores: 35,
      estado: "Online",
    },
    {
      id: "2",
      nombre: "Gateway Sucursal Norte",
      medidores: 25,
      estado: "Online",
    },
    {
      id: "3",
      nombre: "Gateway Sucursal Sur",
      medidores: 25,
      estado: "Offline",
    },
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
          <Text style={styles.summaryValue}>
            {cliente.gateways}
          </Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Medidores</Text>
          <Text style={styles.summaryValue}>
            {cliente.medidores}
          </Text>
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

  summaryCard: {
    backgroundColor: "#fff",
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
    color: "#666",
  },

  summaryValue: {
    fontSize: 24,
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

  gatewayCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 18,
    marginBottom: 15,
    elevation: 3,
  },

  gatewayName: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },

  gatewayInfo: {
    fontSize: 14,
    color: "#666",
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
    color: "#206291",
  },
});