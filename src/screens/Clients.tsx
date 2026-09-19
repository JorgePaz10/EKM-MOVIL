import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { useTheme } from "../context/ThemeContext";
import { getGatewaysUsuario } from "../services/ekmService";

export default function Clients({ navigation }: any) {
  const { colors } = useTheme();
  const styles = crearEstilos(colors);

  const [clientes, setClientes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = async () => {
    try {
      const gateways = await getGatewaysUsuario();

      // Agrupar gateways por cliente
      const clientesAgrupados: any = {};

      gateways.forEach((gateway: any) => {
        if (!clientesAgrupados[gateway.cliente]) {
          clientesAgrupados[gateway.cliente] = {
            id: gateway.cliente,
            nombre: gateway.cliente,
            gateways: 0,
            medidores: 0,
          };
        }

        clientesAgrupados[gateway.cliente].gateways += 1;
      });

      setClientes(Object.values(clientesAgrupados));
    } catch (error) {
      console.log("Error cargando clientes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Clientes</Text>

      <Text style={styles.subtitle}>
        Empresas administradas en Jutaru Control
      </Text>

      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.primary}
        />
      ) : clientes.length === 0 ? (
        <Text style={styles.emptyText}>
          No hay clientes asignados a este usuario.
        </Text>
      ) : (
        clientes.map((cliente) => (
          <TouchableOpacity
            key={cliente.id}
            style={styles.card}
            onPress={() =>
              navigation.navigate("ClientDetails", {
                clientId: cliente.id,
              })
            }
          >
            <Text style={styles.clientName}>
              {cliente.nombre}
            </Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                Gateways
              </Text>

              <Text style={styles.infoValue}>
                {cliente.gateways}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                Medidores
              </Text>

              <Text style={styles.infoValue}>
                {cliente.medidores}
              </Text>
            </View>

            <Text style={styles.detailsText}>
              Ver detalles →
            </Text>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}

const crearEstilos = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 20,
    },

    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: colors.primary,
      marginBottom: 5,
    },

    subtitle: {
      fontSize: 15,
      color: colors.textSecondary,
      marginBottom: 20,
    },

    card: {
      backgroundColor: colors.cardBackground,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      borderRadius: 10,
      padding: 18,
      marginBottom: 15,
      elevation: 3,
    },

    clientName: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 15,
    },

    infoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 8,
    },

    infoLabel: {
      fontSize: 15,
      color: colors.textSecondary,
    },

    infoValue: {
      fontSize: 15,
      fontWeight: "bold",
      color: colors.primary,
    },

    detailsText: {
      marginTop: 10,
      fontSize: 14,
      fontWeight: "bold",
      color: colors.primary,
    },

    emptyText: {
      textAlign: "center",
      marginTop: 30,
      color: colors.textSecondary,
      fontSize: 16,
    },
  });