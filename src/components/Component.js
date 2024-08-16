import React, { useState, useEffect } from 'react';
import { View, Button, Image, StyleSheet, Alert, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import axios from 'axios';

const Profile = () => {
    const [imageUri, setImageUri] = useState(null);

    useEffect(() => {
        requestPermission();
    }, []);

    const requestPermission = async () => {
        let permission;
        if (Platform.OS === 'ios') {
            permission = PERMISSIONS.IOS.PHOTO_LIBRARY;
        } else {
            permission = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
        }

        const result = await request(permission);
        if (result !== RESULTS.GRANTED) {
            Alert.alert('Permissão necessária', 'Precisamos da permissão para acessar a galeria.');
        }
    };

    const selectImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorMessage) {
                console.log('ImagePicker Error: ', response.errorMessage);
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
};

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

export default Profile;
