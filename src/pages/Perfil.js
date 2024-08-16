import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

export default function Profile() {
    const [imageUri, setImageUri] = useState(null);

    const selectImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const uri = response.assets[0].uri;
                setImageUri(uri);
                uploadImage(response.assets[0]);
            }
        });
    };

    const uploadImage = async (image) => {
        const formData = new FormData();
        formData.append('image', {
            uri: image.uri,
            type: image.type,
            name: image.fileName
        });

        try {
            const response = await axios.post('http://10.144.170.28:3000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            Alert.alert('Imagem enviada com sucesso!');
        } catch (error) {
            Alert.alert('Erro ao enviar a imagem', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Selecionar Imagem da Galeria" onPress={selectImage} />
            {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 20,
    },
});
