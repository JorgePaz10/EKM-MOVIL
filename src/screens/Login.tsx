import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

export default function Login({ navigation }: any) {
  // Variables de estado
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estados para mostrar errores
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = () => {
    let valid = true;

    // Limpiar errores anteriores
    setEmailError("");
    setPasswordError("");

    // Validar correo
    if (email.trim() === "") {
      setEmailError("El correo es obligatorio.");
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Ingresa un correo válido.");
      valid = false;
    }

    // Validar contraseña
    if (password.trim() === "") {
      setPasswordError("La contraseña es obligatoria.");
      valid = false;
    }

    // Si hay algún error, no continuar
    if (!valid) {
      return;
    }

    // Si todo está correcto, entrar a la aplicación
    navigation.navigate("UserTabs");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jutaru Control</Text>

      <Text style={styles.subtitle}>
        Inicia sesión para continuar
      </Text>

      <CustomInput
        onChangeText={setEmail}
        value={email}
        placeholder="Ingresa tu email"
        type="email"
      />

      {emailError !== "" && (
        <Text style={styles.errorText}>{emailError}</Text>
      )}

      <CustomInput
        onChangeText={setPassword}
        value={password}
        placeholder="Ingresa tu contraseña"
        type="password"
      />

      {passwordError !== "" && (
        <Text style={styles.errorText}>{passwordError}</Text>
      )}

      <CustomButton
        title="Iniciar Sesión"
        onPress={handleLogin}
      />
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
});