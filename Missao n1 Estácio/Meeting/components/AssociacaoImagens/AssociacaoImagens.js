import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const AssociacaoImagens = ({ onImagemSelecionada }) => {
  const [imagem, setImagem] = useState(null);

  const selecionarImagem = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (resultado.canceled === false) {

      setImagem(resultado.assets && resultado.assets.length > 0 ? resultado.assets[0].uri : null);
      onImagemSelecionada(resultado.assets && resultado.assets.length > 0 ? resultado.assets[0].uri : null);
    }
  };

  return (
    <View style={styles.container}>
      {imagem && <Image source={{ uri: imagem }} style={styles.imagem} />}
      <Pressable title="Selecionar Imagem" onPress={selecionarImagem}
      style={styles.buttonContainer}
      >
        <Text style={styles.buttonText}>
          Selecionar Imagem
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    
  },
  imagem: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonContainer: {
    padding: 8,
    width: '98%',
    margin: 5,
    elevation: 3,
    backgroundColor: '#000000',
    borderWidth: 2,
    borderColor: '#00ff00',
    borderRadius: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    letterSpacing: 0.25,
  },
});

export default AssociacaoImagens;
