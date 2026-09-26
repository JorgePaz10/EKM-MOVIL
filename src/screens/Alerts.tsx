import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import StatusBadge from "../components/StatusBadge";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations/translations";
import { getResumenCompleto } from "../services/ekmService";
import { useAutoRefresh } from "../hooks/useAutoRefresh";

export default function Alerts({ navigation }: any) {
  const { colors } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];
  const styles = crearEstilos(colors);

  const [loading, setLoading] = useState(true);
  const [alertas, setAlertas] = useState<any[]>([]);

  const cargarAlertas = useCallback(async () => {
    try {
      const gatewaysConMedidores = await getResumenCompleto();

      const alertasGeneradas: any[] = [];

      gatewaysConMedidores.forEach((gateway: any) => {
        if (!gateway.activo || gateway.errorConexion) {
          alertasGeneradas.push({
            id: `gw-${gateway.id}`,
            tipo: "offline",
            titulo: t.gatewayOfflineTitle,
            mensaje: t.gatewayOfflineMsg.replace("{nombre}", gateway.nombre),
            cliente: gateway.cliente,
            gateway: gateway.nombre,
            gatewayId: gateway.id,
          });
        }

        gateway.medidores.forEach((medidor: any) => {
          if (medidor.estado !== "Online") {
            alertasGeneradas.push({
              id: `mt-${medidor.id}`,
              tipo: "offline",
              titulo: t.meterOfflineTitle,
              mensaje: t.meterOfflineMsg.replace("{nombre}", medidor.nombre),
              cliente: gateway.cliente,
              gateway: gateway.nombre,
              gatewayId: gateway.id,
              meterId: medidor.id,
            });
          }
        });
      });

      setAlertas(alertasGeneradas);

    } catch (error) {
      console.log("Error cargando alertas:", error);
    } finally {
      setLoading(false);
    }
  }, [t]);

  const { refreshing, onRefresh } = useAutoRefresh(cargarAlertas, 5 * 60 * 1000);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>{t.loadingAlerts}</Text>
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
      <Text style={styles.title}>{t.alertsTitle}</Text>

      <Text style={styles.subtitle}>
        {t.alertsSubtitle}
      </Text>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>
          {t.activeAlerts}
        </Text>
        <Text style={styles.summaryValue}>
          {alertas.length}
        </Text>
      </View>

      {alertas.map((alerta) => (
        <TouchableOpacity
          key={alerta.id}
          style={styles.alertCard}
          onPress={() =>
            navigation.navigate("GatewayDetails", {
              gatewayId: alerta.gatewayId,
            })
          }
        >
          <View style={styles.alertHeader}>
            <Text style={styles.alertTitle}>
              {alerta.titulo}
            </Text>
            <StatusBadge status={alerta.tipo} />
          </View>

          <Text style={styles.alertMessage}>
            {alerta.mensaje}
          </Text>

          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              {t.cliente}: {alerta.cliente}
            </Text>
            <Text style={styles.infoText}>
              {t.gateway}: {alerta.gateway}
            </Text>
          </View>

          <Text style={styles.detailsText}>
            {t.verDetalles}
          </Text>
        </TouchableOpacity>
      ))}

      {alertas.length === 0 && (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>
            {t.noAlertsTitle}
          </Text>
          <Text style={styles.emptyText}>
            {t.noAlertsMsg}
          </Text>
        </View>
      )}
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
  summaryCard: {
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 15,
    color: colors.textSecondary,
  },
  summaryValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.primary,
    marginTop: 5,
  },
  alertCard: {
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 10,
    padding: 18,
    marginBottom: 15,
    elevation: 3,
  },
  alertHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  alertTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: colors.text,
    flex: 1,
    marginRight: 10,
  },
  alertMessage: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 21,
    marginBottom: 12,
  },
  infoContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 10,
  },
  infoText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  detailsText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "bold",
    color: colors.primary,
  },
  emptyCard: {
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 10,
    padding: 20,
    elevation: 3,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
  },
});