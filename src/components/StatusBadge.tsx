import React from "react";
import { View, Text, StyleSheet } from "react-native";

type StatusBadgeProps = {
  status: "online" | "offline" | "warning";
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const statusInfo = {
    online: {
      text: "Online",
      icon: "●",
    },
    offline: {
      text: "Offline",
      icon: "●",
    },
    warning: {
      text: "Alerta",
      icon: "●",
    },
  };

  const currentStatus = statusInfo[status];

  return (
    <View
      style={[
        styles.badge,
        status === "online" && styles.online,
        status === "offline" && styles.offline,
        status === "warning" && styles.warning,
      ]}
    >
      <Text style={styles.icon}>{currentStatus.icon}</Text>
      <Text style={styles.text}>{currentStatus.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },

  online: {
    backgroundColor: "#d4edda",
  },

  offline: {
    backgroundColor: "#f8d7da",
  },

  warning: {
    backgroundColor: "#fff3cd",
  },

  icon: {
    marginRight: 5,
    fontSize: 12,
  },

  text: {
    fontSize: 13,
    fontWeight: "bold",
  },
});