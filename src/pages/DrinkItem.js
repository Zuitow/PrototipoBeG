// DrinkItem.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from "@react-navigation/native";


export default function DrinkItem({ id, name }) {
    const route = useRoute();
  const token = route.params?.token || null;
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            style={styles.container}
            
            onPress={() => navigation.navigate('DrinkDetails', { id, token })}
        >
            <Text style={styles.name}>{name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        margin: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    name: {
        fontSize: 18,
    },
});
