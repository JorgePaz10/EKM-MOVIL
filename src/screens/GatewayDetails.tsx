import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import GatewayCard from "../components/GatewayCard";
import MeterCard from "../components/MeterCard";
import StatusBadge from "../components/StatusBadge";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations/translations";
import { useAutoRefresh } from "../hooks/useAutoRefresh";

import {
  getGatewaysUsuario,
  getDatosEKMGateway,
} from "../services/ekmService";

export default function GatewayDetails({ route, navigation }: any) {
  const { colors } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];
  const styles = crearEstilos(colors);

  const { gatewayId } = route.params;

  const [gateway, setGateway] = useState<any>(null);
  const [medidores, setMedidores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const cargarGateway = useCallback(async () => {
    try {
      const gateways = await getGatewaysUsuario();

      const gatewayEncontrado = gateways.find(
        (item: any) => item.id === gatewayId
      );

      if (!gatewayEncontrado) {
        console.log("Gateway no encontrado");
        return;
      }

      setGateway(gatewayEncontrado);

      const data = await getDatosEKMGateway(
        gatewayEncontrado.url_api
      );

      const readSet = data?.readMeter?.ReadSet ?? [];

      const medidoresMapeados = readSet.map((item: any) => {
        const lectura = item.ReadData?.[0];
        const kwh = lectura ? parseFloat(lectura.kWh_Tot) : 0;
        const tieneLectura = !!lectura && lectura.Good === 1;

        return {
          id: item.Meter,
          nombre: item.Meter_Name?.trim()
            ? item.Meter_Name
            : `Medidor ${item.Meter}`,
          device: item.Device,
          protocolo: item.Protocol,
          mac: item.MAC_Addr,
          estado: tieneLectura ? "Online" : "Offline",
          lectura: kwh,
          fecha: lectura?.Date ?? "",
          hora: lectura?.Time ?? "",
          goodReadsRatio: lectura?.Good_Reads_Ratio ?? null,
          readAttempts: lectura?.Read_Attempts ?? null,
          pulsos: lectura?.Pulse_Cnt_1 ?? null,
        };
      });

      setMedidores(medidoresMapeados);

    } catch (error) {
      console.log(
        "Error cargando gateway:",
        error
      );
    } finally {
      setLoading(false);
    }
  }, [gatewayId]);

  const { refreshing, onRefresh } = useAutoRefresh(cargarGateway, 5 * 60 * 1000);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color={colors.primary}
        />
        <Text style={styles.loadingText}>
          {t.loadingGateway}
        </Text>
      </View>
    );
  }

  if (!gateway) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.title}>
          {t.gatewayNotFound}
        </Text>
      </View>
    );
  }

  const gatewayStatus = gateway.activo
    ? "online"
    : "offline";

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

      <Text style={styles.title}>
        {gateway.nombre}
      </Text>

      <Text style={styles.subtitle}>
        {t.gatewayInfo}
      </Text>


      <GatewayCard
        name={gateway.nombre}
        meters={medidores.length}
        status={gatewayStatus}
      />


      <View style={styles.infoCard}>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>{t.cliente}</Text>
          <Text style={styles.infoValue}>{gateway.cliente}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>{t.estado}</Text>
          <StatusBadge status={gatewayStatus} />
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>{t.gatewayActive}</Text>
          <Text style={styles.infoValue}>
            {gateway.activo ? t.si : t.no}
          </Text>
        </View>

      </View>


      <Text style={styles.sectionTitle}>
        {t.metersCountLabel.replace("{count}", String(medidores.length))}
      </Text>

      {medidores.length === 0 && (
        <Text style={styles.subtitle}>
          {t.noMetersReported}
        </Text>
      )}

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
            navigation.navigate(
              "MeterDetails",
              {
                meterId: medidor.id,
                gatewayNombre: gateway.nombre,
                mac: medidor.mac,
                fecha: medidor.fecha,
                hora: medidor.hora,
                estado: medidor.estado,
                lectura: medidor.lectura,
                nombre: medidor.nombre,
                device: medidor.device,
                protocolo: medidor.protocolo,
                goodReadsRatio: medidor.goodReadsRatio,
                readAttempts: medidor.readAttempts,
                pulsos: medidor.pulsos,
              }
            )
          }
        />

      ))}

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
    infoCard: {
      backgroundColor: colors.cardBackground,
      borderWidth: 1,
      borderColor: colors.cardBorder,
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
      borderBottomColor: colors.border,
    },
    infoLabel: {
      fontSize: 15,
      color: colors.textSecondary,
    },
    infoValue: {
      fontSize: 15,
      fontWeight: "bold",
      color: colors.text,
      maxWidth: "60%",
      textAlign: "right",
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 12,
    },
  });