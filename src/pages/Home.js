import { StyleSheet, View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function Home() {
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [passcode, setPasscode] = useState("");
    const [username, setUsername] = useState("");

    const IP_URL = "10.144.170.28";

    const handleSignup = async () => {
        try {
            const response = await axios.post(`http://${IP_URL}:3000/usuarios`, {
                username: username,
                email: email,
                passcode: passcode,
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
                username: username,
                passcode: passcode,
            });
            if (response.status === 200) {
                const token = response.data.token;
                alert("Login bem-sucedido");
                console.log("Login bem-sucedido");
                navigation.navigate("DrinksList", { token });
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
            <Text style={styles.textos}>Wow que bacana</Text>
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
                secureTextEntry
            />
            <Pressable style={styles.apertabel} onPress={handleLogin}>
                <Text style={{ fontSize: 25 }}>PRESS ME</Text>
            </Pressable>
            <Pressable style={[styles.apertabel, { backgroundColor: 'blue' }]} onPress={() => navigation.navigate("Drinks")}>
                <Text style={{ fontSize: 25 }}>Ir para Drinks</Text>
            </Pressable>

            <Pressable style={[styles.apertabel, { backgroundColor: 'yellow' }]} onPress={() => navigation.navigate("DrinksList")}>
                <Text style={{ fontSize: 25 }}>Ir para DrinksList</Text>
            </Pressable>

            <Pressable style={[styles.apertabel, { backgroundColor: 'yellow' }]} onPress={() => navigation.navigate("Profile")}>
                <Text style={{ fontSize: 25 }}>Ir para Perfil</Text>
            </Pressable>
        </View>
    );
}

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
        marginBottom: 10,
        paddingHorizontal: 8,
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
