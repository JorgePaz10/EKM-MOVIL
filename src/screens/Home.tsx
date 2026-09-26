import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import { useTheme } from "../context/ThemeContext";
import { getResumenCompleto } from "../services/ekmService";
import { useAutoRefresh } from "../hooks/useAutoRefresh";

export default function Home() {
  const { colors } = useTheme();
  const styles = crearEstilos(colors);

  const [loading, setLoading] = useState(true);
  const [resumen, setResumen] = useState({
    clientes: 0,
    gateways: 0,
    medidores: 0,
    medidoresOnline: 0,
    medidoresOffline: 0,
    gatewaysOffline: 0,
  });

  const cargarResumen = useCallback(async () => {
    try {
      const gatewaysConMedidores = await getResumenCompleto();

      const clientesUnicos = new Set(
        gatewaysConMedidores.map((g: any) => g.cliente)
      );

      let totalMedidores = 0;
      let online = 0;
      let offline = 0;
      let gatewaysOffline = 0;

      gatewaysConMedidores.forEach((gateway: any) => {
        if (!gateway.activo || gateway.errorConexion) {
          gatewaysOffline++;
        }

        gateway.medidores.forEach((medidor: any) => {
          totalMedidores++;
          if (medidor.estado === "Online") {
            online++;
          } else {
            offline++;
          }
        });
      });

      setResumen({
        clientes: clientesUnicos.size,
        gateways: gatewaysConMedidores.length,
        medidores: totalMedidores,
        medidoresOnline: online,
        medidoresOffline: offline,
        gatewaysOffline,
      });

    } catch (error) {
      console.log("Error cargando resumen:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const { refreshing, onRefresh } = useAutoRefresh(cargarResumen, 5 * 60 * 1000);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Cargando resumen...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={colors.primary}
        />
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>Jutaru Control</Text>
        <Text style={styles.subtitle}>
          Monitoreo de sistemas EKM
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Resumen general</Text>

      <View style={styles.cardsContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Clientes</Text>
          <Text style={styles.cardValue}>{resumen.clientes}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Gateways</Text>
          <Text style={styles.cardValue}>{resumen.gateways}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Medidores</Text>
          <Text style={styles.cardValue}>{resumen.medidores}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Estado de medidores</Text>

      <View style={styles.statusCard}>
        <View style={styles.statusRow}>
          <View style={styles.statusIndicatorOnline} />
          <Text style={styles.statusText}>Online</Text>
          <Text style={styles.statusValue}>
            {resumen.medidoresOnline}
          </Text>
        </View>

        <View style={styles.statusRow}>
          <View style={styles.statusIndicatorOffline} />
          <Text style={styles.statusText}>Offline</Text>
          <Text style={styles.statusValue}>
            {resumen.medidoresOffline}
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Incidencias</Text>

      <View style={styles.alertCard}>
        <Text style={styles.alertTitle}>Atención requerida</Text>
        <Text style={styles.alertText}>
          Hay {resumen.medidoresOffline} medidores offline
          {resumen.gatewaysOffline > 0
            ? ` y ${resumen.gatewaysOffline} gateway(s) sin conexión`
            : ""}
          .
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
  header: {
    marginBottom: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.primary,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 12,
    marginTop: 10,
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 10,
    padding: 15,
    width: "31%",
    elevation: 3,
  },
  cardTitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 25,
    fontWeight: "bold",
    color: colors.primary,
  },
  statusCard: {
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 10,
    padding: 15,
    elevation: 3,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
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
  statusText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  statusValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
  },
  alertCard: {
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 10,
    padding: 15,
    marginBottom: 30,
    elevation: 3,
  },
  alertTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 6,
  },
  alertText: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
  },
});