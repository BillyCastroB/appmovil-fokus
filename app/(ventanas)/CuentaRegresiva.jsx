import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CuentaRegresiva({ route }) {
  const { actividad, tiempo } = route.params; // Accede a los parámetros

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cuenta Regresiva</Text>
      <Text style={styles.text}>Actividad: {actividad}</Text>
      <Text style={styles.text}>Tiempo: {tiempo} minutos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
  },
});
