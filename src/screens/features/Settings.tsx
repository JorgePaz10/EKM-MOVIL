import React, { useState } from "react";
import {View,Text,StyleSheet,ScrollView,Alert,Switch,} from "react-native";

import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

import { useUser } from "../../context/UserContext";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";

export default function Settings() {

  // Tema (colores + toggle claro/oscuro)
  const { isDark, colors, toggleTheme } = useTheme();

  // Idioma actual
  const { language, changeLanguage } = useLanguage();

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

    if (texto.trim() !== "") {
      setNombreError("");
    }
  };

  // =========================
  // MANEJAR TELÉFONO
  // =========================

  const manejarTelefono = (texto: string) => {

    let numeros = texto.replace(/\D/g, "");
    numeros = numeros.slice(0, 8);

    if (numeros.length > 4) {
      numeros =
        numeros.slice(0, 4) + "-" + numeros.slice(4);
    }

    setTelefonoTemp(numeros);

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

    if (nombreTemp.trim() === "") {
      setNombreError(
        "Por favor, introduzca un nombre"
      );
      valido = false;
    }

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

    if (!valido) {
      return;
    }

    setNombre(nombreTemp);
    setTelefono(telefonoTemp);

    Alert.alert(
      "Datos guardados",
      "La información se guardó correctamente."
    );
  };

  // Estilos dinámicos según el tema actual
  const styles = crearEstilos(colors);

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
          BOTÓN GUARDAR
      ========================= */}

      <View style={styles.buttonContainer}>

        <CustomButton
          title="Guardar cambios"
          onPress={guardarCambios}
          variant="primary"
        />

      </View>


      {/* =========================
          APARIENCIA
      ========================= */}

      <Text style={styles.subtitle}>
        Apariencia
      </Text>

      <View style={styles.themeRow}>

        <Text style={styles.label}>
          Modo oscuro
        </Text>

        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor={colors.surface}
        />

      </View>


      {/* =========================
          IDIOMA
      ========================= */}

      <Text style={styles.subtitle}>
        Idioma
      </Text>

      <View style={styles.themeRow}>

        <Text style={styles.label}>
          Español / English
        </Text>

        <View style={styles.langButtons}>

          <Text
            style={[
              styles.langOption,
              language === "es" && styles.langOptionActive,
            ]}
            onPress={() => changeLanguage("es")}
          >
            ES
          </Text>

          <Text
            style={[
              styles.langOption,
              language === "en" && styles.langOptionActive,
            ]}
            onPress={() => changeLanguage("en")}
          >
            EN
          </Text>

        </View>

      </View>

    </ScrollView>
  );
}

// =========================
// ESTILOS DINÁMICOS
// =========================

const crearEstilos = (colors: any) => StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 25,
    marginBottom: 15,
  },

  label: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.text,
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

  themeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 10,
    padding: 15,
  },

  langButtons: {
    flexDirection: "row",
    gap: 12,
  },

  langOption: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.textSecondary,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },

  langOptionActive: {
    color: colors.primary,
    textDecorationLine: "underline",
  },

});