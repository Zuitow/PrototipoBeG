import React, { useState, useEffect } from 'react';
import { View, TextInput, Pressable, Text, Alert, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

export default function DrinkDetails() {
    const route = useRoute();
    const token = route.params?.token || null;
    const { id } = route.params;
    const [review, setReview] = useState({
        autor: '',
        comentario: '',
        nota: '',
    });
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`http://10.144.170.28:3000/reviews/${id}`);
                setReviews(response.data);
            } catch (error) {
                console.error('Erro ao buscar reviews:', error);
                Alert.alert("Erro ao buscar reviews");
            }
        };

        fetchReviews();
    }, [id]);

    const handleReview = async () => {
        if (!token) {
            Alert.alert("Você precisa estar logado para enviar uma review");
            console.log("Você precisa estar logado para enviar uma review");
            return;
        }

        try {
            await axios.post(
                `http://10.144.170.28:3000/reviews`,
                {
                    autor: review.autor,
                    produto: id,
                    comentario: review.comentario,
                    nota: review.nota,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            );
            Alert.alert("Review enviada com sucesso");
            console.log("Review Enviada com Sucesso");
            setReview({ autor: '', comentario: '', nota: '' }); // Limpa os campos após envio
            // Recarrega as reviews após envio
            const updatedReviews = await axios.get(`http://10.144.170.28:3000/reviews/${id}`);
            setReviews(updatedReviews.data);
        } catch (error) {
            Alert.alert("Erro ao enviar review", error.response?.data?.message || 'Erro desconhecido');
        }
    };

    const renderReview = ({ item }) => (
        <View style={styles.reviewItem}>
            <Text style={styles.reviewAuthor}>{item.autor}</Text>
            <Text style={styles.reviewText}>{item.comentario}</Text>
            <Text style={styles.reviewRating}>Nota: {item.nota}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                placeholder="Autor"
                value={review.autor}
                onChangeText={(text) => setReview({ ...review, autor: text })}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Comentário"
                value={review.comentario}
                onChangeText={(text) => setReview({ ...review, comentario: text })}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Nota"
                value={review.nota}
                onChangeText={(text) => setReview({ ...review, nota: text })}
            />
            <Pressable style={styles.button} onPress={handleReview}>
                <Text style={styles.buttonText}>Enviar Review</Text>
            </Pressable>

            <FlatList
                data={reviews}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderReview}
                style={styles.reviewsList}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginVertical: 4,
        borderRadius: 4,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 12,
        alignItems: 'center',
        borderRadius: 4,
        marginVertical: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    reviewsList: {
        marginTop: 16,
    },
    reviewItem: {
        padding: 16,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
    },
    reviewAuthor: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
    },
    reviewText: {
        fontSize: 14,
        marginBottom: 4,
        color: '#333',
    },
    reviewRating: {
        fontSize: 12,
        color: '#666',
    },
});
