import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { db } from "../firebase"; // Asegúrate de usar la ruta correcta
import { collection, onSnapshot } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export default function ListadoActividades() {
  const [actividades, setActividades] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const obtenerActividades = async () => {
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
  }, []);

  const manejarClickActividad = (actividad) => {
    navigation.navigate("CuentaRegresiva", {
      actividad: actividad.actividad,
      tiempo: actividad.tiempo,
    });
  };

  return (
    <Container>
      <Titulo>Listado de Actividades</Titulo>
      {actividades.length > 0 ? (
        actividades.map((actividad) => (
          <Card key={actividad.id} onPress={() => manejarClickActividad(actividad)}>
            <TextoActividad>{actividad.actividad}</TextoActividad>
            <TextoDescripcion>{actividad.descripcion}</TextoDescripcion>
            <TextoTiempo>{`Tiempo: ${actividad.tiempo} mins`}</TextoTiempo>
          </Card>
        ))
      ) : (
        <TextoSinActividades>No hay actividades registradas.</TextoSinActividades>
      )}
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
  color: #777;
  margin-top: 5px;
`;

const TextoSinActividades = styled.Text`
  font-size: 16px;
  color: #999;
  text-align: center;
  margin-top: 20px;
`;
