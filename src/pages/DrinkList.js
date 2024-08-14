// DrinkList.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useRoute } from "@react-navigation/native";

import DrinkItem from './DrinkItem';

export default function DrinksList() {
    const route = useRoute();
  const token = route.params?.token || null;
    const [drinks, setDrinks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDrinks = async () => {
            try {
                const response = await axios.get('http://10.144.170.28:3000/produtos');
                setDrinks(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar drinks:', error);
                setLoading(false);
            }
        };

        fetchDrinks();
    }, []);

    const renderItem = ({ item }) => <DrinkItem id={item.id} name={item.name} />;

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={drinks}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
});
