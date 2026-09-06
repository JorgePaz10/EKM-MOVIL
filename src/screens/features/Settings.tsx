
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

import { useUser } from "../../context/UserContext";

export default function Settings() {

  // Datos compartidos del usuario
  const { nombre, telefono, setNombre, setTelefono } = useUser();

  // Estados temporales para editar
  const [nombreTemp, setNombreTemp] = useState(nombre);
  const [telefonoTemp, setTelefonoTemp] = useState(telefono);

  const [nombreError, setNombreError] = useState("");
  const [telefonoError, setTelefonoError] = useState("");

  // =========================
  // MANEJAR NOMBRE
  // =========================

  const manejarNombre = (texto: string) => {
    setNombreTemp(texto);

    // Quitar error mientras escribe
    if (texto.trim() !== "") {
      setNombreError("");
    }
  };

  // =========================
  // MANEJAR TELÉFONO
  // =========================

  const manejarTelefono = (texto: string) => {

    // Eliminar todo lo que no sean números
    let numeros = texto.replace(/\D/g, "");

    // Máximo 8 números
    numeros = numeros.slice(0, 8);

    // Agregar guion después de los primeros 4 números
    if (numeros.length > 4) {
      numeros =
        numeros.slice(0, 4) + "-" + numeros.slice(4);
    }

    setTelefonoTemp(numeros);

    // Validación mientras escribe
    if (numeros.length === 0) {
      setTelefonoError("");
    } else {
      const cantidadNumeros = numeros.replace(/\D/g, "").length;

      if (cantidadNumeros < 8) {
        setTelefonoError(
          "El teléfono debe tener 8 números"
        );
      } else {
        setTelefonoError("");
      }
    }
  };

  // =========================
  // GUARDAR CAMBIOS
  // =========================

  const guardarCambios = () => {

    let valido = true;

    setNombreError("");
    setTelefonoError("");

    // -------------------------
    // Validar nombre
    // -------------------------

    if (nombreTemp.trim() === "") {

      setNombreError(
        "Por favor, introduzca un nombre"
      );

      valido = false;
    }

    // -------------------------
    // Validar teléfono
    // -------------------------

    const numerosTelefono =
      telefonoTemp.replace(/\D/g, "");

    if (numerosTelefono === "") {

      setTelefonoError(
        "El teléfono es obligatorio"
      );

      valido = false;

    } else if (numerosTelefono.length < 8) {

      setTelefonoError(
        "El teléfono debe tener exactamente 8 números"
      );

      valido = false;
    }

    // -------------------------
    // Si hay errores
    // -------------------------

    if (!valido) {
      return;
    }

    // -------------------------
    // Guardar datos
    // -------------------------

    setNombre(nombreTemp);
    setTelefono(telefonoTemp);

    Alert.alert(
      "Datos guardados",
      "La información se guardó correctamente."
    );
  };

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        Configuración
      </Text>

      <Text style={styles.subtitle}>
        Información personal
      </Text>


      {/* =========================
          NOMBRE
      ========================= */}

      <Text style={styles.label}>
        Nombre
      </Text>

      <CustomInput
        placeholder="Ingrese su nombre"
        value={nombreTemp}
        onChangeText={manejarNombre}
        type="default"
        error={nombreError !== ""}
      />

      {nombreError !== "" && (
        <Text style={styles.error}>
          {nombreError}
        </Text>
      )}


      {/* =========================
          TELÉFONO
      ========================= */}

      <Text style={styles.label}>
        Teléfono
      </Text>

      <CustomInput
        placeholder="Ingrese su teléfono"
        value={telefonoTemp}
        onChangeText={manejarTelefono}
        type="number"
        error={telefonoError !== ""}
      />

      {telefonoError !== "" && (
        <Text style={styles.error}>
          {telefonoError}
        </Text>
      )}


      {/* =========================
          BOTÓN
      ========================= */}

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
