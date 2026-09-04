import React from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

export default function Profile() {
  const nombre = "Jorge Paz";
  const correo = "jorge@jutaru.com";
  const rol = "Administrador";
  const empresa = "Jutaru Control";

  return (
    <ScrollView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Image
            source={require("../../../assets/images/FotoDePefilJP.jpeg")}
            style={styles.profileImage}
          />
        </View>

        <Text style={styles.name}>{nombre}</Text>

        <Text style={styles.role}>{rol}</Text>
      </View>

      {/* Información */}
      <Text style={styles.sectionTitle}>
        Información de usuario
      </Text>

      <View style={styles.card}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Correo</Text>
          <Text style={styles.value}>{correo}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Rol</Text>
          <Text style={styles.value}>{rol}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Empresa</Text>
          <Text style={styles.value}>{empresa}</Text>
        </View>
      </View>

      {/* Estado */}
      <Text style={styles.sectionTitle}>
        Estado de cuenta
      </Text>

      <View style={styles.statusCard}>
        <View style={styles.statusIndicator} />

        <View>
          <Text style={styles.statusTitle}>
            Cuenta activa
          </Text>

          <Text style={styles.statusText}>
            El usuario tiene acceso al sistema.
          </Text>
        </View>
      </View>

      {/* Cerrar sesión */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>
          Cerrar sesión
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
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
    backgroundColor: "#206291",
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
    color: "#333",
  },

  role: {
    fontSize: 15,
    color: "#666",
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
    marginTop: 10,
  },

  card: {
    backgroundColor: "#fff",
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
    borderBottomColor: "#eee",
  },

  label: {
    fontSize: 14,
    color: "#666",
  },

  value: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    maxWidth: "60%",
    textAlign: "right",
  },

  statusCard: {
    backgroundColor: "#fff",
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
    color: "#333",
  },

  statusText: {
    fontSize: 13,
    color: "#666",
    marginTop: 3,
  },

  logoutButton: {
    backgroundColor: "#fff",
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