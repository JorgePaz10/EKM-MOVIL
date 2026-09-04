import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

import GatewayCard from "../components/GatewayCard";
import MeterCard from "../components/MeterCard";

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

  const medidores = [
    {
      id: "1",
      nombre: "Medidor 001",
      estado: "Online",
      lectura: 1250.45,
    },

    {
      id: "2",
      nombre: "Medidor 002",
      estado: "Online",
      lectura: 980.2,
    },

    {
      id: "3",
      nombre: "Medidor 003",
      estado: "Offline",
      lectura: 0,
    },

    {
      id: "4",
      nombre: "Medidor 004",
      estado: "Online",
      lectura: 1456.8,
    },
  ];

  const gateway = gateways[gatewayId];

  const gatewayStatus =
    gateway.estado === "Online"
      ? "online"
      : "offline";

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {gateway.nombre}
      </Text>

      <Text style={styles.subtitle}>
        Información del gateway
      </Text>

      {/* Gateway reutilizable */}
      <GatewayCard
        name={gateway.nombre}
        meters={gateway.medidores}
        status={gatewayStatus}
      />

      {/* Información general */}
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>
            Cliente
          </Text>

          <Text style={styles.infoValue}>
            {gateway.cliente}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>
            Ubicación
          </Text>

          <Text style={styles.infoValue}>
            {gateway.ubicacion}
          </Text>
        </View>
      </View>

      {/* Medidores */}
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
              : "offline"
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

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
});