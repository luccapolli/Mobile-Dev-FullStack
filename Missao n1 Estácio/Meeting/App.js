import React, { useState } from 'react';
import { ScrollView, View, Button, StyleSheet, Pressable, Text } from 'react-native';
import CadastroFornecedor from './components/CadastroFornecedor/CadastroFornecedor';
import ListagemFornecedores from './components/ListagemFornecedores/ListagemFornecedores';

const App = () => {
  const [currentPage, setCurrentPage] = useState('cadastro');
  const [fornecedores, setFornecedores] = useState([]);

  const handleCadastro = (novoFornecedor) => {
    // Atualizar o estado dos fornecedores
    setFornecedores([...fornecedores, novoFornecedor]);

    // Mudar para a aba de listagem
    setCurrentPage('listagem');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'cadastro':
        return <CadastroFornecedor onCadastro={handleCadastro} />;
      case 'listagem':
        return <ListagemFornecedores fornecedores={fornecedores} />;
      // Adicione mais casos conforme necessário
      default:
        return null;
    }
  };

  return (
    <ScrollView style={{backgroundColor: 'black'}}>
      <View style={styles.container}>
        <Pressable 
          onPress={() => setCurrentPage('cadastro')} title="Cadastro" 
          style={styles.buttonContainer}
          >
          <Text style={styles.buttonText}>
            Cadastro
          </Text>
        </Pressable>        
        
        <Pressable 
          onPress={() => setCurrentPage('listagem')} title="Listagem"  
          style={styles.buttonContainer}         
          >
           <Text style={styles.buttonText}>
            Listagem
          </Text>
        </Pressable>          
        
        
      </View>

      {renderPage()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    width: '90%',
    alignSelf: 'center',
    paddingTop: 100,
    paddingBottom: 20,
    backgroundColor: '#000000'
  },
  buttonContainer: {
    padding: 8,
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

export default App;
