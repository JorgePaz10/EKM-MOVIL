import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

import StatusBadge from "../components/StatusBadge";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations/translations";

export default function MeterDetails({ route }: any) {
  const { colors } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];
  const styles = crearEstilos(colors);

  const {
    nombre,
    gatewayNombre,
    device,
    protocolo,
    mac,
    estado,
    lectura,
    fecha,
    hora,
    goodReadsRatio,
    readAttempts,
    pulsos,
  } = route.params;

  const meterStatus =
    estado === "Online" ? "online" : "offline";

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {nombre}
      </Text>

      <Text style={styles.subtitle}>
        {t.meterInfo}
      </Text>

      <View style={styles.statusCard}>
        <Text style={styles.statusLabel}>
          {t.currentStatus}
        </Text>
        <StatusBadge status={meterStatus} />
      </View>

      <View style={styles.readingCard}>
        <Text style={styles.readingLabel}>
          {t.currentReading}
        </Text>
        <Text style={styles.reading}>
          {lectura} kWh
        </Text>
      </View>

      <Text style={styles.sectionTitle}>
        {t.deviceInfo}
      </Text>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>{t.gateway}</Text>
          <Text style={styles.infoValue}>{gatewayNombre}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>{t.deviceType}</Text>
          <Text style={styles.infoValue}>{device ?? t.notAvailable}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>{t.protocol}</Text>
          <Text style={styles.infoValue}>{protocolo ?? t.notAvailable}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>{t.mac}</Text>
          <Text style={styles.infoValue}>{mac}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>{t.lastDate}</Text>
          <Text style={styles.infoValue}>{fecha}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>{t.lastTime}</Text>
          <Text style={styles.infoValue}>{hora}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>
        {t.readingQuality}
      </Text>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>{t.readAttempts}</Text>
          <Text style={styles.infoValue}>{readAttempts ?? t.notAvailable}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>{t.goodReadsRatio}</Text>
          <Text style={styles.infoValue}>
            {goodReadsRatio !== null ? `${goodReadsRatio}%` : t.notAvailable}
          </Text>
        </View>
        {pulsos !== null && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t.waterPulses}</Text>
            <Text style={styles.infoValue}>{pulsos}</Text>
          </View>
        )}
      </View>

      <Text style={styles.sectionTitle}>
        {t.monitoring}
      </Text>

      <View style={styles.monitorCard}>
        <Text style={styles.monitorTitle}>
          {t.communicationStatus}
        </Text>
        <Text style={styles.monitorText}>
          {estado === "Online"
            ? t.meterOnlineMsg
            : t.meterOfflineMsgDetail}
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
  title: {
    fontSize: 27,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  statusCard: {
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
  },
  statusLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  readingCard: {
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 10,
    padding: 20,
    marginBottom: 25,
    elevation: 3,
  },
  readingLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  reading: {
    fontSize: 30,
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
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text,
    maxWidth: "60%",
    textAlign: "right",
  },
  monitorCard: {
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 10,
    padding: 18,
    marginBottom: 30,
    elevation: 3,
  },
  monitorTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8,
  },
  monitorText: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
  },
});