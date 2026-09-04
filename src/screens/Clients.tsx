import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default function Clients({ navigation }: any) {
  const clientes = [
    {
      id: "1",
      nombre: "Supermercados Del Corral",
      gateways: 3,
      medidores: 85,
    },
    {
      id: "2",
      nombre: "Empresa ABC",
      gateways: 2,
      medidores: 60,
    },
    {
      id: "3",
      nombre: "Corporación XYZ",
      gateways: 4,
      medidores: 95,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Clientes</Text>

      <Text style={styles.subtitle}>
        Empresas administradas en Jutaru Control
      </Text>

      {clientes.map((cliente) => (
        <TouchableOpacity
          key={cliente.id}
          style={styles.card}
          onPress={() =>
            navigation.navigate("ClientDetails", {
              clientId: cliente.id,
            })
          }
        >
          <Text style={styles.clientName}>{cliente.nombre}</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Gateways</Text>
            <Text style={styles.infoValue}>{cliente.gateways}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Medidores</Text>
            <Text style={styles.infoValue}>{cliente.medidores}</Text>
          </View>

          <Text style={styles.detailsText}>
            Ver detalles →
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
    fontSize: 28,
    fontWeight: "bold",
    color: "#206291",
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 15,
    color: "#666",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 18,
    marginBottom: 15,
    elevation: 3,
  },

  clientName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  infoLabel: {
    fontSize: 15,
    color: "#666",
  },

  infoValue: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#206291",
  },

  detailsText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: "#206291",
  },
});