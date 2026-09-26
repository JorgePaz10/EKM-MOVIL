import React from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

import { useUser } from "../../context/UserContext";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../utils/translations/translations";

export default function Profile({ navigation }: any) {

  const { colors } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];
  const styles = crearEstilos(colors);

  const { telefono } = useUser();

  const { user, logout } = useAuth();

  const nombre = user?.nombre || t.defaultUser;
  const correo = user?.email || t.notRegistered;
  const rol = user?.role || t.defaultUser;

  const empresa = "Jutaru Control";

  const cerrarSesion = async () => {
    await logout();
    navigation.getParent()?.replace("LoginScreen");
  };

  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>

        <View style={styles.avatar}>
          <Image
            source={require("../../../assets/images/logojutraru.png")}
            style={styles.profileImage}
          />
        </View>

        <Text style={styles.name}>
          {nombre}
        </Text>

        <Text style={styles.role}>
          {rol}
        </Text>

      </View>


      <Text style={styles.sectionTitle}>
        {t.userInfo}
      </Text>

      <View style={styles.card}>

        <View style={styles.infoRow}>
          <Text style={styles.label}>{t.correo}</Text>
          <Text style={styles.value}>{correo}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>{t.telefono}</Text>
          <Text style={styles.value}>
            {telefono || t.notRegistered}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>{t.rol}</Text>
          <Text style={styles.value}>{rol}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>{t.empresa}</Text>
          <Text style={styles.value}>{empresa}</Text>
        </View>

      </View>


      <Text style={styles.sectionTitle}>
        {t.accountStatus}
      </Text>

      <View style={styles.statusCard}>

        <View style={styles.statusIndicator} />

        <View>
          <Text style={styles.statusTitle}>
            {t.activeAccount}
          </Text>

          <Text style={styles.statusText}>
            {t.activeAccountMsg}
          </Text>
        </View>

      </View>


      <TouchableOpacity
        style={styles.logoutButton}
        onPress={cerrarSesion}
      >
        <Text style={styles.logoutText}>
          {t.logout}
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const crearEstilos = (colors: any) => StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },

  header: {
    alignItems: "center",
    marginBottom: 30,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    overflow: "hidden",
  },

  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },

  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
  },

  role: {
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

  card: {
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 10,
    padding: 18,
    marginBottom: 20,
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

  label: {
    fontSize: 14,
    color: colors.textSecondary,
  },

  value: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text,
    maxWidth: "60%",
    textAlign: "right",
  },

  statusCard: {
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 10,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    elevation: 3,
  },

  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "green",
    marginRight: 12,
  },

  statusTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
  },

  statusText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 3,
  },

  logoutButton: {
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: "#d9534f",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    marginBottom: 30,
  },

  logoutText: {
    color: "#d9534f",
    fontSize: 15,
    fontWeight: "bold",
  },

});