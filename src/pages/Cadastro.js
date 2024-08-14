import { StyleSheet, View, Text, TextInput, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

 export default function Home() {
 return (
    <View style={styles.container}>
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
  
  </View>
)
 }