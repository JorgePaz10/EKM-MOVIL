import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Switch,
} from "react-native";

import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

import { useUser } from "../../context/UserContext";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../utils/translations/translations";

export default function Settings() {

  const { isDark, colors, toggleTheme } = useTheme();
  const { language, changeLanguage } = useLanguage();
  const t = translations[language];

  const { nombre, telefono, setNombre, setTelefono } = useUser();

  const [nombreTemp, setNombreTemp] = useState(nombre);
  const [telefonoTemp, setTelefonoTemp] = useState(telefono);

  const [nombreError, setNombreError] = useState("");
  const [telefonoError, setTelefonoError] = useState("");

  const manejarNombre = (texto: string) => {
    setNombreTemp(texto);
    if (texto.trim() !== "") {
      setNombreError("");
    }
  };

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
        setTelefonoError(t.phoneInvalidError);
      } else {
        setTelefonoError("");
      }
    }
  };

  const guardarCambios = () => {
    let valido = true;

    setNombreError("");
    setTelefonoError("");

    if (nombreTemp.trim() === "") {
      setNombreError(t.nameRequiredError);
      valido = false;
    }

    const numerosTelefono = telefonoTemp.replace(/\D/g, "");

    if (numerosTelefono === "") {
      setTelefonoError(t.phoneRequiredError);
      valido = false;
    } else if (numerosTelefono.length < 8) {
      setTelefonoError(t.phoneInvalidError);
      valido = false;
    }

    if (!valido) {
      return;
    }

    setNombre(nombreTemp);
    setTelefono(telefonoTemp);

    Alert.alert(t.savedTitle, t.savedMessage);
  };

  const styles = crearEstilos(colors);

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        {t.settingsTitle}
      </Text>

      <Text style={styles.subtitle}>
        {t.personalInfo}
      </Text>


      <Text style={styles.label}>
        {t.nameLabel}
      </Text>

      <CustomInput
        placeholder={t.namePlaceholder}
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


      <Text style={styles.label}>
        {t.phoneLabel}
      </Text>

      <CustomInput
        placeholder={t.phonePlaceholder}
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


      <View style={styles.buttonContainer}>
        <CustomButton
          title={t.saveChanges}
          onPress={guardarCambios}
          variant="primary"
        />
      </View>


      <Text style={styles.subtitle}>
        {t.appearance}
      </Text>

      <View style={styles.themeRow}>

        <Text style={styles.label}>
          {t.darkMode}
        </Text>

        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor={colors.surface}
        />

      </View>


      <Text style={styles.subtitle}>
        {t.language}
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