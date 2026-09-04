import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

export default function Settings() {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");

  const [nombreError, setNombreError] = useState("");
  const [telefonoError, setTelefonoError] = useState("");

  const guardarCambios = () => {
    let valido = true;

    setNombreError("");
    setTelefonoError("");

    // Validación del nombre
    if (nombre.trim() === "") {
      setNombreError("El nombre es obligatorio");
      valido = false;
    }

    // Validación del teléfono
    if (telefono.trim() === "") {
      setTelefonoError("El teléfono es obligatorio");
      valido = false;
    } else if (telefono.length < 8) {
      setTelefonoError("El teléfono debe tener al menos 8 números");
      valido = false;
    }

    if (!valido) {
      return;
    }

    Alert.alert(
      "Datos guardados",
      "La información se guardó correctamente."
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Configuración</Text>

      <Text style={styles.subtitle}>
        Información personal
      </Text>

      {/* Nombre */}
      <Text style={styles.label}>Nombre</Text>

      <CustomInput
        placeholder="Ingrese su nombre"
        value={nombre}
        onChangeText={setNombre}
        type="default"
      />

      {nombreError !== "" && (
        <Text style={styles.error}>
          {nombreError}
        </Text>
      )}

      {/* Teléfono */}
      <Text style={styles.label}>Teléfono</Text>

      <CustomInput
        placeholder="Ingrese su teléfono"
        value={telefono}
        onChangeText={setTelefono}
        type="number"
      />

      {telefonoError !== "" && (
        <Text style={styles.error}>
          {telefonoError}
        </Text>
      )}

      <View style={styles.buttonContainer}>
        <CustomButton
          title="Guardar cambios"
          onPress={guardarCambios}
          variant="primary"
        />
      </View>
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
    color: "#333",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 25,
  },

  label: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },

  error: {
    color: "#d9534f",
    fontSize: 13,
    marginTop: -5,
    marginBottom: 12,
  },

  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
});