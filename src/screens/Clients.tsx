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

import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations/translations";
import { getResumenCompleto } from "../services/ekmService";
import { useAutoRefresh } from "../hooks/useAutoRefresh";

export default function Clients({ navigation }: any) {
  const { colors } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];
  const styles = crearEstilos(colors);

  const [loading, setLoading] = useState(true);
  const [clientes, setClientes] = useState<any[]>([]);

  const cargarClientes = useCallback(async () => {
    try {
      const gatewaysConMedidores = await getResumenCompleto();

      const agrupado: Record<string, any> = {};

      gatewaysConMedidores.forEach((gateway: any) => {
        if (!agrupado[gateway.cliente]) {
          agrupado[gateway.cliente] = {
            nombre: gateway.cliente,
            gateways: 0,
            medidores: 0,
          };
        }
        agrupado[gateway.cliente].gateways += 1;
        agrupado[gateway.cliente].medidores += gateway.medidores.length;
      });

      setClientes(Object.values(agrupado));

    } catch (error) {
      console.log("Error cargando clientes:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const { refreshing, onRefresh } = useAutoRefresh(cargarClientes, 5 * 60 * 1000);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>{t.loadingClients}</Text>
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
      <Text style={styles.title}>{t.clientsTitle}</Text>

      <Text style={styles.subtitle}>
        {t.clientsSubtitle}
      </Text>

      {clientes.map((cliente) => (
        <TouchableOpacity
          key={cliente.nombre}
          style={styles.card}
          onPress={() =>
            navigation.navigate("ClientDetails", {
              clientName: cliente.nombre,
            })
          }
        >
          <Text style={styles.clientName}>{cliente.nombre}</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t.gateways}</Text>
            <Text style={styles.infoValue}>{cliente.gateways}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t.medidores}</Text>
            <Text style={styles.infoValue}>{cliente.medidores}</Text>
          </View>

          <Text style={styles.detailsText}>
            {t.verDetalles}
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
});