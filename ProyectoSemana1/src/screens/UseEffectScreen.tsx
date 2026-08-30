import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function UseEffectScreen() {
  const [contador, setContador] = useState(0);
  const [mensajeSinDependencias, setMensajeSinDependencias] = useState(
    "Aún no se ha ejecutado"
  );
  const [mensajeConDependencia, setMensajeConDependencia] = useState(
    "Aún no se ha ejecutado"
  );

  /*
    1- Tipo: useEffect sin arreglo de dependencias
    2- Definicion: Este efecto se ejecuta despues de cada renderizado del componente, si dentro del efecto se actualiza un estado,
       ese cambio puede provocar un nuevo render y el efecto puede ejecutarse nuevamente.
    3- Cuando usarlo: Se recomienda cuando necesitas ejecutar logica o sincronizaciones secundarias de forma constante tras cualquier cambio visual o 
       actualizacion de datos en la pantalla.
  */
  useEffect(() => {
    console.log("useEffect sin dependencias: componente renderizado");

    setMensajeSinDependencias("El componente se renderizó");
  });
 

   /*
    1- Tipo: useEffect con arreglo de dependencias [contador]
    2- Definicion: Este efecto se ejecuta despues del primer renderizado y nuevamente cada vez que cambia el valor de la variable incluida en el arreglo de dependencias,
       en este caso, "contador".
    3- Cuando usarlo: Se recomienda para reaccionar de manera especifica a cambios de variables concretas, como hacer llamadas a una API cuando un ID cambia,
       o registrar estadisticas ante eventos de usuario.
  */ 
  useEffect(() => {
    console.log("useEffect con [contador]:", contador);

    setMensajeConDependencia(`El contador cambió a: ${contador}`);
  }, [contador]);


  const incrementarContador = () => {
    setContador((actual) => actual + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Demostracion de useEffect</Text>

      <Text style={styles.counter}>
        Contador: {contador}
      </Text>

      <Button
        title="Incrementar contador"
        onPress={incrementarContador}
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          useEffect sin dependencias
        </Text>

        <Text style={styles.text}>
          {mensajeSinDependencias}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          useEffect con [contador]
        </Text>

        <Text style={styles.text}>
          {mensajeConDependencia}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },

  counter: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 20,
  },

  section: {
    marginTop: 25,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  text: {
    fontSize: 16,
    marginTop: 5,
  },
});
