import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRoute } from "@react-navigation/native";

export default function Drinks() {
  const route = useRoute();
  const token = route.params?.token || null;

  useEffect(() => {
    if (!token) {
      console.log("Usuário não logado.");
    }
  }, [token]);

  const [review, setReview] = useState({
    autor: "",
    produto: "",
    comentario: "",
    nota: "",
  });
  const [reviews, setReviews] = useState([]);

  const IP_URL = "10.144.170.28";

  const fetchReviews = async (produtoId) => {
    try {
      const response = await axios.get(
        `http://${IP_URL}:3000/reviews/${produtoId}`
      );
      setReviews(response.data);
    } catch (error) {
      console.error("Erro ao buscar reviews:", error);
    }
  };

  useEffect(() => {
    // Substitua "produtoId" pelo ID do produto que você quer buscar as reviews
    const produtoId = "id_do_produto_aqui"; // Ajuste conforme necessário
    fetchReviews(produtoId);
  }, []);

  const handleReview = async () => {
    if (!token) {
      Alert.alert("Você precisa estar logado para enviar uma review");
      console.log("Você precisa estar logado para enviar uma review");
      return;
    }

    try {
      await axios.post(
        `http://${IP_URL}:3000/reviews`,
        {
          autor: review.autor,
          produto: review.produto,
          comentario: review.comentario,
          nota: review.nota,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Alert.alert("Review enviada com sucesso");
      console.log("Review Enviada com Sucesso");
    } catch (error) {
      Alert.alert("Erro ao enviar review", error.response.data.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.Corpo}>
          <View style={styles.quadradoestranho}></View>
          <View>
            <Text style={styles.Label}>Comentário</Text>
            <TextInput
              style={styles.TextInput}
              placeholder="Autor"
              value={review.autor}
              onChangeText={(text) => setReview({ ...review, autor: text })}
            />
            <TextInput
              style={styles.TextInput}
              placeholder="Produto"
              value={review.produto}
              onChangeText={(text) => setReview({ ...review, produto: text })}
            />
            <TextInput
              style={styles.TextInput}
              placeholder="Comentário"
              value={review.comentario}
              onChangeText={(text) =>
                setReview({ ...review, comentario: text })
              }
            />
            <TextInput
              style={styles.TextInput}
              placeholder="Nota"
              value={review.nota}
              onChangeText={(text) => setReview({ ...review, nota: text })}
            />
            <Pressable
              style={[styles.apertabel, { backgroundColor: "blue" }]}
              onPress={handleReview}
            >
              <Text style={{ fontSize: 25, color: "white" }}>
                Enviar Review
              </Text>
            </Pressable>
            <View>
                        <Text style={styles.Label}>Reviews</Text>
                        {reviews.map((rev, index) => (
                            <View key={index} style={styles.reviewContainer}>
                                <Text style={styles.reviewText}>Autor: {rev.autor}</Text>
                                <Text style={styles.reviewText}>Produto: {rev.produto}</Text>
                                <Text style={styles.reviewText}>Comentário: {rev.comentario}</Text>
                                <Text style={styles.reviewText}>Nota: {rev.nota}</Text>
                            </View>
                        ))}
                </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    padding: 30,
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
  quadradoestranho: {
    width: 300,
    height: 500,
    backgroundColor: "darkblue",
    borderRadius: 15,
  },
  Corpo: {
    alignItems: "center",
  },
});
