
import styled from "styled-components/native";
import { useState } from "react";
import { Alert } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "../firebase";
import { router } from "expo-router";
import { useEffect } from "react";
import { BackHandler } from "react-native";

// Inicializa Firebase
initializeApp(firebaseConfig);

export default function login() {
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Salir", "¿Estás seguro de que deseas salir de la aplicación?", [
        { text: "Cancelar", style: "cancel" },
        { text: "Salir", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => backHandler.remove();
  }, []);
  const [email, setEmail] = useState(""); // Estado para el email
  const [password, setPassword] = useState(""); // Estado para la contraseña
  useEffect( ()=>{
    setEmail("")
    setPassword("") 
  }, [] )
  const auth = getAuth();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Si las credenciales son correctas, navega al menú de inicio
      router.push("/menuInicio");
      setTimeout( ()=>{
        setEmail("")
        setPassword("")
      },500 )
    } catch (error) {
      // Muestra una alerta si las credenciales son incorrectas
      Alert.alert("Error", "Usuario o contraseña inválidos");
    }
  };

  return (
    <GestureHandlerRootView>
      <Container>
        <Imagen source={require("../../assets/images/fondoDibujo.jpg")} />
        <IconoLogo source={require("../../assets/images/icono-estudio.png")} />
        <Titulo>INICIAR SESIÓN</Titulo>
        <Div1>
          <IconoUser source={require("../../assets/images/usuario.png")} />
          <UsuarioTextInput
            placeholder="Ingrese correo electrónico"
            placeholderTextColor="#000000"
            value={email}
            onChangeText={setEmail} // Actualiza el estado de email
          />
        </Div1>
        <LineaNegra />
        <Div2>
          <IconoUser source={require("../../assets/images/candado.png")} />
          <PasswordTextInput
            secureTextEntry={true}
            placeholder="Ingrese su Contraseña"
            placeholderTextColor="#000000"
            value={password}
            onChangeText={setPassword} // Actualiza el estado de password
          />
        </Div2>
        <LineaNegra2 />
        <Div3>
          <CajaBoton onPress={handleLogin}>
            <TextoIniciarSesion>INGRESAR</TextoIniciarSesion>
          </CajaBoton>
        </Div3>
        <OlvidarContra onPress={() => router.push("/newPassword")}>
          ¿Olvidaste tu contraseña?
        </OlvidarContra>
      </Container>
    </GestureHandlerRootView>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #ad0707;
  justify-content: center;
  z-index: -2;
`;
const Imagen = styled.Image`
  width: 100%;
  height: 100%;
  z-index: -1;
  position: absolute;
`;
const IconoLogo = styled.Image`
  width: 150px;
  height: 150px;
  margin: 0 auto;
`;
const Titulo = styled.Text`
  color: #122177;
  text-align: center;
  font-weight: bold;
  margin: 30px 0;
  font-size: 20px;
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
  background-color: transparent;
  font-size: 20px;
`;
const LineaNegra = styled.View`
  height: 2;
  width: 65%;
  background-color: #686868;
  margin: 0 auto;
`;
const Div2 = styled.View`
  margin-top: 20px;
  flex-direction: row;
  gap: 15px;
  align-items: center;
  justify-content: center;
`;
const PasswordTextInput = styled.TextInput`
  font-size: 16px;
  color: black;
  width: 220px;
  background-color: transparent;
  font-size: 20px;
`;
const LineaNegra2 = styled.View`
  height: 2;
  width: 65%;
  background-color: #686868;
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
const OlvidarContra = styled.Text`
  margin-top: 20px;
  font-size: 17px;
  color: #009b9b;
  font-weight: bold;
  text-align: center;
`;
const Div3 = styled.View`
  margin: 40px 0;
`;
