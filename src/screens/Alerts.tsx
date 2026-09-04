import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default function Alerts({ navigation }: any) {
const alertas = [
  {
    id: "1",
    tipo: "offline",
    titulo: "Medidor offline",
    mensaje: "El Medidor 003 no está reportando información.",
    cliente: "Supermercados Del Corral",
    gateway: "Gateway Sucursal Principal",
    meterId: "3",
    gatewayId: "1",
  },
  {
    id: "2",
    tipo: "warning",
    titulo: "Sin actualización",
    mensaje: "El Medidor 002 no ha actualizado su lectura recientemente.",
    cliente: "Empresa ABC",
    gateway: "Gateway Sucursal Norte",
    meterId: "2",
    gatewayId: "2",
  },
  {
    id: "3",
    tipo: "offline",
    titulo: "Gateway offline",
    mensaje: "El gateway de la Sucursal Sur no está disponible.",
    cliente: "Corporación XYZ",
    gateway: "Gateway Sucursal Sur",
    gatewayId: "3",
  },
];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Alertas</Text>

      <Text style={styles.subtitle}>
        Incidencias que requieren atención
      </Text>

      {/* Resumen */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>
          Alertas activas
        </Text>

        <Text style={styles.summaryValue}>
          {alertas.length}
        </Text>
      </View>

      {/* Lista de alertas */}
      {alertas.map((alerta) => (
        <TouchableOpacity
          key={alerta.id}
          style={styles.alertCard}
          onPress={() =>
            alerta.meterId &&
            navigation.navigate("MeterDetails", {
              meterId: alerta.meterId,
            })
          }
        >
          <View style={styles.alertHeader}>
            <View
              style={[
                styles.indicator,
                alerta.tipo === "offline"
                  ? styles.offlineIndicator
                  : styles.warningIndicator,
              ]}
            />

            <Text style={styles.alertTitle}>
              {alerta.titulo}
            </Text>
          </View>

          <Text style={styles.alertMessage}>
            {alerta.mensaje}
          </Text>

          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              Cliente: {alerta.cliente}
            </Text>

            <Text style={styles.infoText}>
              Gateway: {alerta.gateway}
            </Text>
          </View>

          <Text style={styles.detailsText}>
            Ver detalle →
          </Text>
        </TouchableOpacity>
      ))}

      {alertas.length === 0 && (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>
            Sin alertas
          </Text>

          <Text style={styles.emptyText}>
            Todos los sistemas se encuentran funcionando correctamente.
          </Text>
        </View>
      )}
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
    fontSize: 28,
    fontWeight: "bold",
    color: "#206291",
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 15,
    color: "#666",
    marginBottom: 20,
  },

  summaryCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },

  summaryTitle: {
    fontSize: 15,
    color: "#666",
  },

  summaryValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#206291",
    marginTop: 5,
  },

  alertCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 18,
    marginBottom: 15,
    elevation: 3,
  },

  alertHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  indicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },

  offlineIndicator: {
    backgroundColor: "red",
  },

  warningIndicator: {
    backgroundColor: "orange",
  },

  alertTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#333",
  },

  alertMessage: {
    fontSize: 15,
    color: "#555",
    lineHeight: 21,
    marginBottom: 12,
  },

  infoContainer: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
  },

  infoText: {
    fontSize: 13,
    color: "#666",
    marginBottom: 4,
  },

  detailsText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "bold",
    color: "#206291",
  },

  emptyCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 3,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },

  emptyText: {
    fontSize: 15,
    color: "#666",
    lineHeight: 22,
  },
});