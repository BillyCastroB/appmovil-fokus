import styled from "styled-components/native";
import { View, Text, Image } from "react-native";
import { useEffect } from "react";
import { router } from "expo-router";
export default function index (){

  useEffect( ()=>{
    setTimeout( ()=>{
      router.replace("/login")
    },3000 )
  }, [])

  return(
    <Container>
      <Imagen source={require('../../assets/images/fondo_splash.jpg')} />
      <TextoSplash> FOKUS </TextoSplash>
    </Container>
  )
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
`
const Icono = styled.Image`
  width: 150px;
  height: 150px;
  margin: 0 auto;
`
const TextoSplash = styled.Text`
  text-align: center;
  color: white;
  font-size: 18px;
  margin-top: 15px;
  letter-spacing: 1px;
`