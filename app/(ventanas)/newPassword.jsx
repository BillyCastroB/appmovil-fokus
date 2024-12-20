
import styled from "styled-components/native";
import React, { useState } from "react";
import { Alert } from "react-native";
import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { firebaseConfig } from "../firebase"; // Tu configuración de Firebase

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function NewPassword() {
  const [email, setEmail] = useState("");

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Por favor, ingresa tu correo electrónico");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        "Éxito",
        "Se ha enviado un enlace de restablecimiento de contraseña a tu correo."
      );
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al enviar el correo. Verifica tu dirección.");
      console.error(error);
    }
  };

  return (
    <Container>
      <FondoImagen source={require("../../assets/images/fondoDibujo.jpg")} resizeMode="cover">
        <IconoLogo source={require("../../assets/images/logo_cip.png")} />
        <Texto>Ingrese su correo electrónico registrado para restablecer la contraseña</Texto>
        <Div1>
          <IconoUser source={require("../../assets/images/usuario.png")} />
          <UsuarioTextInput
            placeholder="Ingrese su correo"
            placeholderTextColor="#000000"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </Div1>
        <Div3>
          <CajaBoton onPress={handleResetPassword}>
            <TextoIniciarSesion>Enviar</TextoIniciarSesion>
          </CajaBoton>
        </Div3>
      </FondoImagen>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

const FondoImagen = styled.ImageBackground`
  height: 100%;
  justify-content: center;
`;

const IconoLogo = styled.Image`
  width: 100px;
  height: 100px;
  margin: 0 auto;
`;

const Texto = styled.Text`
  text-align: center;
  font-size: 16px;
  color: #b30202;
  margin: 10px 30px;
  font-weight: bold;
`;

const Div1 = styled.View`
  flex-direction: row;
  gap: 15px;
  align-items: center;
  justify-content: center;
`;

const IconoUser = styled.Image`
  width: 25px;
  height: 25px;
`;

const UsuarioTextInput = styled.TextInput`
  font-size: 16px;
  color: black;
  width: 220px;
  background-color: #ffffff8f;
  font-size: 16px;
  text-align: center;
`;

const Div3 = styled.View`
  margin: 40px 0;
`;

const CajaBoton = styled.TouchableOpacity`
  width: 40%;
  background-color: #bb1010;
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
