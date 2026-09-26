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
import { getResumenCompleto } from "../services/ekmService";

export default function ClientDetails({ route, navigation }: any) {
  const { colors } = useTheme();
  const styles = crearEstilos(colors);

  const { clientName } = route.params;

  const [loading, setLoading] = useState(true);
  const [gateways, setGateways] = useState<any[]>([]);

  useEffect(() => {
    const cargarCliente = async () => {
      try {
        const gatewaysConMedidores = await getResumenCompleto();

        const gatewaysDelCliente = gatewaysConMedidores.filter(
          (g: any) => g.cliente === clientName
        );

        setGateways(gatewaysDelCliente);

      } catch (error) {
        console.log("Error cargando cliente:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarCliente();
  }, [clientName]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Cargando cliente...</Text>
      </View>
    );
  }

  const totalMedidores = gateways.reduce(
    (acc, g) => acc + g.medidores.length,
    0
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{clientName}</Text>

      <Text style={styles.subtitle}>
        Información general del cliente
      </Text>

      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Gateways</Text>
          <Text style={styles.summaryValue}>{gateways.length}</Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Medidores</Text>
          <Text style={styles.summaryValue}>{totalMedidores}</Text>
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
            Medidores: {gateway.medidores.length}
          </Text>

          <Text
            style={[
              styles.gatewayStatus,
              gateway.activo && !gateway.errorConexion
                ? styles.online
                : styles.offline,
            ]}
          >
            ● {gateway.activo && !gateway.errorConexion ? "Online" : "Offline"}
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
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: colors.textSecondary,
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