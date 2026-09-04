import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import StatusBadge from "./StatusBadge";

type GatewayCardProps = {
  name: string;
  meters: number;
  status: "online" | "offline" | "warning";
  onPress?: () => void;
};

export default function GatewayCard({
  name,
  meters,
  status,
  onPress,
}: GatewayCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>📡</Text>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{name}</Text>
          <StatusBadge status={status} />
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Medidores conectados</Text>

        <Text style={styles.infoValue}>
          {meters}
        </Text>
      </View>

      <Text style={styles.details}>
        Ver gateway →
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 10,
    backgroundColor: "#eaf2f8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  icon: {
    fontSize: 23,
  },

  titleContainer: {
    flex: 1,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },

  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  infoLabel: {
    fontSize: 14,
    color: "#777",
  },

  infoValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#206291",
  },

  details: {
    textAlign: "right",
    color: "#206291",
    fontWeight: "bold",
    fontSize: 14,
  },
});