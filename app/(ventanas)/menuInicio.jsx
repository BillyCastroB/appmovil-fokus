import styled from "styled-components/native";
import { Text, ImageBackground, TextInput, TouchableOpacity, View, Image } from "react-native";
import { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../firebase"; // Asegúrate de importar tu configuración de Firebase

export default function MenuInicio() {
  const [actividad, setActividad] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tiempo, setTiempo] = useState(0);

  const db = getFirestore(app); // Obtener referencia a Firestore

  const agregarActividad = async () => {
    // Validación de campos
    if (!actividad || !descripcion || !tiempo) {
      console.log("Todos los campos son obligatorios");
      return;
    }
    if (isNaN(tiempo)) {
      console.log("El tiempo debe ser un número");
      return;
    }

    try {
      // Agregar datos a Firestore
      await addDoc(collection(db, "actividades"), {
        actividad,
        descripcion,
        tiempo: parseInt(tiempo, 10), // Convertir tiempo a número
      });
      console.log("Actividad agregada con éxito");
      setActividad("");
      setDescripcion("");
      setTiempo("");
      alert("Actividad agregada con éxito");
    } catch (error) {
      console.error("Error al agregar actividad: ", error);
    }
  };

  return (
    <Container>
      <Cabecera>
        <FondoImgCabecera source={require("../../assets/images/fondo-negro.jpg")} resizeMode="cover">
          <Nombre>BILLY CASTRO BULLON</Nombre>
          <Condicion>Administre su tiempo</Condicion>
        </FondoImgCabecera>
        <Formulario>
          <TituloDiv>Ingrese los datos de su actividad</TituloDiv>
          <Div1>
            <IconoUser source={require("../../assets/images/icono-de-estudio.png")} />
            <UsuarioTextInput
              placeholder="Actividad"
              placeholderTextColor="#000000"
              value={actividad}
              onChangeText={setActividad}
            />
          </Div1>
          <LineaNegra/>
          <Div2>
            <IconoUser source={require("../../assets/images/icono-descripcion.png")} />
            <UsuarioTextInput
              placeholder="Descripción"
              placeholderTextColor="#000000"
              value={descripcion}
              onChangeText={setDescripcion}
            />
          </Div2>
          <LineaNegra2 />
          <Div2>
            <IconoUser source={require("../../assets/images/icono-tiempo.png")} />
            <UsuarioTextInput
              placeholder="Tiempo (en minutos)"
              placeholderTextColor="#000000"
              value={tiempo}
              keyboardType="numeric" // Asegura que solo se ingresen números
              onChangeText={setTiempo}
            />
          </Div2>
          <LineaNegra2 />
          <Div3>
            <CajaBoton onPress={agregarActividad}>
              <TextoIniciarSesion>Agregar</TextoIniciarSesion>
            </CajaBoton>
          </Div3>
        </Formulario>
      </Cabecera>
    </Container>
  );
}

// Estilos (sin cambios)
const Container = styled.View`
  flex: 1;
`;
const Cabecera = styled.View`
  margin-top: 50px;
  height: 120px;
`;
const FondoImgCabecera = styled.ImageBackground`
  height: 200px;
  z-index: -1;
`;
const Nombre = styled.Text`
  color: white;
  text-align: center;
  font-size: 24px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: bold;
  letter-spacing: 2px;
`;
const Condicion = styled.Text`
  text-align: center;
  color: white;
  font-size: 17px;
  margin: 5px 0;
`;
const Formulario = styled.View`
  background-color: white;
  width: 90%;
  height: 540px;
  border-radius: 10px;
  padding: 15px;
  margin: 25px auto;
  elevation: 5;
`;
const TituloDiv = styled.Text`
  text-align: center;
  font-size: 15px;
  font-weight: bold;
`;
const Div1 = styled.View`
  flex-direction: row;
  gap: 15px;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;
const Div2 = styled.View`
  margin-top: 20px;
  flex-direction: row;
  gap: 15px;
  align-items: center;
  justify-content: center;
`;
const Div3 = styled.View`
  margin: 40px 0;
`;
const UsuarioTextInput = styled.TextInput`
  font-size: 16px;
  color: black;
  width: 220px;
  background-color: transparent;
  font-size: 20px;
`;
const IconoUser = styled.Image`
  width: 45px;
  height: 45px;
`;
const LineaNegra = styled.View`
  height: 2px;
  width: 50%;
  background-color: #999999;
  margin: 0 auto;
`;
const LineaNegra2 = styled.View`
  height: 2px;
  width: 50%;
  background-color: #999999;
  margin: 0 auto;
`;
const CajaBoton = styled.TouchableOpacity`
  width: 40%;
  background-color: #1f1d36;
  margin: 0 auto;
  height: 45px;
  border-radius: 0px 15px 0px 15px;
  align-items: center;
  justify-content: center;
`;
const TextoIniciarSesion = styled.Text`
  color: white;
  font-size: 21px;
  text-align: center;
`;
