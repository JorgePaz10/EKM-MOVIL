import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations/translations";

// AUTH CONTEXT
import { useAuth } from "../context/AuthContext";

export default function Login({ navigation }: any) {

  // Idioma actual y textos traducidos
  const { language, changeLanguage } = useLanguage();
  const t = translations[language];

  // AUTH CONTEXT
  const { login, loginWithGoogle } = useAuth();

  // Variables de estado
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estados para mostrar errores
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // =========================
  // LOGIN NORMAL
  // =========================
  const handleLogin = async () => {

    let valid = true;

    setEmailError("");
    setPasswordError("");

    // =========================
    // VALIDAR CORREO
    // =========================
    if (email.trim() === "") {

      setEmailError("El correo es obligatorio.");
      valid = false;

    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

      setEmailError("El correo no es válido.");
      valid = false;

    }

    // =========================
    // VALIDAR CONTRASEÑA
    // =========================
    if (password.trim() === "") {

      setPasswordError("La contraseña es obligatoria.");
      valid = false;

    } else if (password.length < 6) {

      setPasswordError("La contraseña es insegura.");
      valid = false;

    }

    // Si hay errores de validación
    if (!valid) {
      return;
    }

    // =========================
    // LOGIN CON SUPABASE
    // =========================

    console.log("Intentando iniciar sesión...");

    const success = await login(
      email,
      password
    );

    console.log("Resultado login:", success);

    // =========================
    // USUARIO AUTORIZADO
    // =========================

    if (success) {

      console.log("Usuario autorizado.");

      navigation.navigate("UserTabs");

    } else {

      // =========================
      // USUARIO NO AUTORIZADO
      // =========================

      setPasswordError(
        "Correo, contraseña o autorización incorrectos."
      );

    }
  };

  // =========================
  // LOGIN CON GOOGLE
  // =========================
  const handleGoogleLogin = async () => {

    console.log("Iniciando login con Google...");

    const success = await loginWithGoogle();

    console.log("Resultado Google:", success);

    if (success) {

      navigation.navigate("UserTabs");

    }
  };

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Jutaru Control
      </Text>

      <Text style={styles.subtitle}>
        {t.welcomeLogin}
      </Text>

      {/* CORREO */}

      <CustomInput
        onChangeText={setEmail}
        value={email}
        placeholder={t.typeEmail}
        type="email"
        error={emailError !== ""}
      />

      {emailError !== "" && (

        <Text style={styles.errorText}>
          {emailError}
        </Text>

      )}

      {/* CONTRASEÑA */}

      <CustomInput
        onChangeText={setPassword}
        value={password}
        placeholder={t.typePwd}
        type="password"
        error={passwordError !== ""}
      />

      {passwordError !== "" && (

        <Text style={styles.errorText}>
          {passwordError}
        </Text>

      )}

      {/* LOGIN NORMAL */}

      <CustomButton
        title={t.signIn}
        onPress={handleLogin}
      />

      {/* LOGIN CON GOOGLE */}

      <CustomButton
        title="Continuar con Google"
        onPress={handleGoogleLogin}
      />

      {/* SELECTOR DE IDIOMA */}

      <View style={styles.langRow}>

        <Text
          style={[
            styles.langOption,
            language === "es" &&
              styles.langOptionActive,
          ]}
          onPress={() => changeLanguage("es")}
        >
          ES
        </Text>

        <Text
          style={[
            styles.langOption,
            language === "en" &&
              styles.langOptionActive,
          ]}
          onPress={() => changeLanguage("en")}
        >
          EN
        </Text>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#206291",
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 25,
  },

  errorText: {
    color: "red",
    fontSize: 13,
    width: "100%",
    marginTop: -5,
    marginBottom: 8,
  },

  langRow: {
    flexDirection: "row",
    marginTop: 20,
    gap: 15,
  },

  langOption: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#999",
    paddingVertical: 4,
    paddingHorizontal: 10,
  },

  langOptionActive: {
    color: "#206291",
    textDecorationLine: "underline",
  },

});
