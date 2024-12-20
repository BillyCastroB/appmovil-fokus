import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { db } from "../firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { Alert } from "react-native";
import { Audio } from "expo-av";

export default function ListadoActividades() {
  const [actividades, setActividades] = useState([]);
  const [tiempoRestante, setTiempoRestante] = useState(null); // Para manejar el tiempo restante
  const [actividadActual, setActividadActual] = useState(null); // Para manejar la actividad en curso
  const [intervalo, setIntervalo] = useState(null); // Para manejar el intervalo

  const [inicioSonido, setInicioSonido] = useState(null); // Sonido al inicio
  const [finalSonido, setFinalSonido] = useState(null); // Sonido al final

  useEffect(() => {
    const obtenerActividades = () => {
      const unsubscribe = onSnapshot(collection(db, "actividades"), (snapshot) => {
        const actividadesObtenidas = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setActividades(actividadesObtenidas);
      });

      return () => unsubscribe();
    };

    obtenerActividades();

    // Cargar sonidos al montar el componente
    cargarSonidos();

    return () => {
      // Liberar recursos al desmontar el componente
      if (inicioSonido) inicioSonido.unloadAsync();
      if (finalSonido) finalSonido.unloadAsync();
    };
  }, []);

  const cargarSonidos = async () => {
    try {
      const [inicio, final] = await Promise.all([
        Audio.Sound.createAsync(require("../../assets/audio/luna-rise-part-one.mp3")),
        Audio.Sound.createAsync(require("../../assets/audio/beep.mp3")),
      ]);
      setInicioSonido(inicio.sound);
      setFinalSonido(final.sound);
    } catch (error) {
      console.error("Error al cargar los sonidos:", error);
    }
  };

  const reproducirSonido = async (sonido) => {
    try {
      await sonido.replayAsync();
    } catch (error) {
      console.error("Error al reproducir el sonido:", error);
    }
  };

  const iniciarCuentaRegresiva = (actividad) => {
    // Limpia cualquier intervalo previo
    if (intervalo) clearInterval(intervalo);

    let tiempoEnSegundos = actividad.tiempo * 60; // Convierte minutos a segundos
    setTiempoRestante(tiempoEnSegundos);
    setActividadActual(actividad); // Guarda la actividad actual

    // Reproducir sonido al inicio
    if (inicioSonido) reproducirSonido(inicioSonido);

    const nuevoIntervalo = setInterval(() => {
      setTiempoRestante((prevTiempo) => {
        if (prevTiempo <= 1) {
          clearInterval(nuevoIntervalo); // Detiene el intervalo cuando llega a 0
          finalizarActividad(actividad); // Llama a la función para finalizar la actividad
          return 0;
        }
        return prevTiempo - 1;
      });
    }, 1000);

    setIntervalo(nuevoIntervalo); // Guarda el intervalo
  };

  const finalizarActividad = async (actividad) => {
    // Reproducir sonido al finalizar
    if (finalSonido) reproducirSonido(finalSonido);

    // Muestra la alerta
    Alert.alert(
      "Tiempo finalizado",
      `El tiempo para la actividad "${actividad.actividad}" ha finalizado.`,
      [{ text: "OK" }]
    );

    // Elimina la actividad de Firestore
    try {
      await deleteDoc(doc(db, "actividades", actividad.id));
      setActividades((prevActividades) =>
        prevActividades.filter((item) => item.id !== actividad.id)
      );
    } catch (error) {
      console.error("Error al eliminar la actividad:", error);
    }

    // Reinicia el estado del tiempo y actividad actual
    setTiempoRestante(null);
    setActividadActual(null);
  };

  const manejarClickActividad = (actividad) => {
    iniciarCuentaRegresiva(actividad);
  };

  const formatearTiempo = (segundos) => {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos}:${segundosRestantes < 10 ? "0" : ""}${segundosRestantes}`;
  };

  return (
    <Container>
      <Titulo>Listado de Actividades</Titulo>
      {actividades.length > 0 ? (
        actividades.map((actividad) => (
          <Card key={actividad.id} onPress={() => manejarClickActividad(actividad)}>
            <TextoActividad>{actividad.actividad || "Sin nombre"}</TextoActividad>
            <TextoDescripcion>{actividad.descripcion || "Sin descripción"}</TextoDescripcion>
            <TextoTiempo>{`Tiempo: ${actividad.tiempo || 0} mins`}</TextoTiempo>
          </Card>
        ))
      ) : (
        <TextoSinActividades>No hay actividades registradas.</TextoSinActividades>
      )}
      <Tiempo>
        {tiempoRestante !== null ? (
          <TextoTiempo>{`Tiempo restante: ${formatearTiempo(tiempoRestante)}`}</TextoTiempo>
        ) : (
          <TextoTiempo>Selecciona una actividad para iniciar la cuenta regresiva.</TextoTiempo>
        )}
      </Tiempo>
    </Container>
  );
}

// Styled Components
const Container = styled.ScrollView`
  flex: 1;
  background-color: #f5f5f5;
  padding: 20px;
`;

const Titulo = styled.Text`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const Card = styled.TouchableOpacity`
  background-color: #ffffff;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 10px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
  elevation: 3;
`;

const TextoActividad = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #ad0707;
`;

const TextoDescripcion = styled.Text`
  font-size: 16px;
  color: #555;
  margin-top: 5px;
`;

const TextoTiempo = styled.Text`
  font-size: 14px;
  color: #000000;
  margin-top: 5px;
`;

const TextoSinActividades = styled.Text`
  font-size: 16px;
  color: #999;
  text-align: center;
  margin-top: 20px;
`;

const Tiempo = styled.View`
  background-color: #268537;
  padding: 10px;
  border-radius: 10px;
  margin-top: 20px;
  color: black;
`;
