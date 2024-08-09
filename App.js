import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import axios from "axios";

export default function App() {
  const [email, setEmail] = useState("");
  const [passcode, setPasscode] = useState("");
  const [username, setUsername] = useState("");
  
  const IP_URL = "192.168.1.192";

  const handleSignup = async () => {
    try {
      const response = await axios.post(`http://${IP_URL}:3000/usuarios`, {
        username: username,
        email: email,
        passcode: passcode
      });
      if (response.status === 201) {
        alert("Cadastro bem-sucedido");
      } else {
        alert("Erro ao cadastrar");
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error.message);
      alert("Erro ao cadastrar");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`http://${IP_URL}:3000/login`, {
        email: email,
        passcode: passcode
      });
      if (response.status === 200) {
        setToken(response.data.token);
        alert("Login bem-sucedido");
      } else {
        alert("Email ou senha incorretos");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error.message);
      alert("Erro ao fazer login");
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.textos}>Wow que bacana</Text>
      <Text style={styles.Label}>Email</Text>
      <TextInput
        style={styles.TextInput}
        value={email}
        onChangeText={(email) => setEmail(email)}
      />

      <Text style={styles.Label}>Senha</Text>
      <TextInput
        style={styles.TextInput}
        value={passcode}
        onChangeText={(password) => setPasscode(password)}
      />

      <Pressable style={styles.apertabel} onPress={() => handleLogin()}>
        <Text style={{ fontSize: 25 }}>PRESS ME</Text>
      </Pressable> */}

    {/* Cadastro */}
    <Text style={[styles.Label, {fontSize: 30, marginTop: 20}]}>Cadastro</Text>

    <Text style={styles.Label}>Username</Text>
      <TextInput
        style={styles.TextInput}
        value={username}
        onChangeText={(username) => setUsername(username)}
      />

    <Text style={styles.Label}>Email</Text>
      <TextInput
        style={styles.TextInput}
        value={email}
        onChangeText={(email) => setEmail(email)}
      />

      <Text style={styles.Label}>Senha</Text>
      <TextInput
        style={styles.TextInput}
        value={passcode}
        onChangeText={(password) => setPasscode(password)}
      />

      <Pressable style={[styles.apertabel,{backgroundColor: 'red'}]} onPress={() => handleSignup()}>
        <Text style={{ fontSize: 25 }}>PRESS ME</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  textos: {
    fontSize: 15,
    color: "green",
    textAlign: "center",
    marginBottom: 30,
  },
  TextInput: {
    width: 300,
    height: 35,
    borderWidth: 1,
    marginLeft: 30,
  },
  Label: {
    textAlign: "left",
    marginLeft: 30,
    fontSize: 20,
  },
  apertabel: {
    height: 35,
    width: 300,
    backgroundColor: "green",
    alignSelf: "center",
    marginTop: 30,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
