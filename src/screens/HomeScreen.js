
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Text,
  Button,
  Card,
  ActivityIndicator,
  Snackbar,
} from 'react-native-paper';

import { salvarFavorito } from '../services/favoritesStorage';

export default function HomeScreen({ navigation }) {
  const [conselho, setConselho] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');

  async function buscarConselho() {
    setCarregando(true);
    setErro('');

    try {
      const resposta = await fetch(
        'https://api.adviceslip.com/advice?t=' + Date.now()
      );

      const dados = await resposta.json();

      setConselho(dados.slip);
    } catch (error) {
      setErro('Não foi possível carregar o conselho.');
    } finally {
      setCarregando(false);
    }
  }

  async function adicionarAosFavoritos() {
    if (!conselho) return;

    const salvo = await salvarFavorito(conselho);

    setMensagem(
      salvo
        ? 'Conselho salvo nos favoritos!'
        : 'Esse conselho já está nos favoritos.'
    );
  }

  
return (
  <View style={styles.container}>
    <View style={styles.cabecalho}>
      <Text variant="labelLarge" style={styles.subtitulo}>
        UM MOMENTO PARA VOCÊ
      </Text>

      <Text variant="headlineLarge" style={styles.titulo}>
        Conselho do Dia
      </Text>

      <Text variant="bodyMedium" style={styles.descricao}>
        Uma pequena inspiração pode transformar seu dia.
      </Text>
    </View>

    <Card style={styles.card} mode="elevated">
      <Card.Content>
        <Text style={styles.icone}>❝</Text>

        {carregando ? (
          <ActivityIndicator animating size="large" />
        ) : (
          <Text variant="bodyLarge" style={styles.conselho}>
            {conselho
              ? conselho.advice
              : 'Clique no botão abaixo para receber uma inspiração.'}
          </Text>
        )}

        {conselho && !carregando && (
          <Text variant="labelSmall" style={styles.id}>
            CONSELHO Nº {conselho.id}
          </Text>
        )}

        {erro !== '' && (
          <Text style={styles.erro}>{erro}</Text>
        )}
      </Card.Content>
    </Card>

    <View style={styles.acoes}>
      <Button
        mode="contained"
        onPress={buscarConselho}
        loading={carregando}
        disabled={carregando}
        contentStyle={styles.botaoConteudo}
      >
        Novo conselho
      </Button>

      <Button
        mode="contained-tonal"
       
        onPress={adicionarAosFavoritos}
        disabled={!conselho || carregando}
        contentStyle={styles.botaoConteudo}
      >
        Salvar nos favoritos
      </Button>

      <Button
        mode="outlined"
        
        onPress={() => navigation.navigate('Favorites')}
        contentStyle={styles.botaoConteudo}
      >
        Ver favoritos
      </Button>
    </View>

    <Snackbar
      visible={mensagem !== ''}
      onDismiss={() => setMensagem('')}
      duration={2500}
    >
      {mensagem}
    </Snackbar>
  </View>
);

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    gap: 28,
  },
  cabecalho: {
    alignItems: 'center',
    gap: 8,
  },
  subtitulo: {
    color: '#668078',
    letterSpacing: 2,
    fontSize: 11,
  },
  titulo: {
    textAlign: 'center',
    color: '#183B36',
    fontWeight: 'bold',
  },
  descricao: {
    textAlign: 'center',
    color: '#66756F',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 12,
    elevation: 3,
  },
  icone: {
    fontSize: 48,
    color: '#91AA9D',
    textAlign: 'center',
  },
  conselho: {
    textAlign: 'center',
    fontSize: 19,
    lineHeight: 29,
    color: '#183B36',
    marginVertical: 18,
  },
  id: {
    textAlign: 'center',
    marginTop: 12,
    color: '#8A9992',
    letterSpacing: 1,
  },
  erro: {
    color: '#B00020',
    textAlign: 'center',
  },
  acoes: {
    gap: 12,
  },
  botaoConteudo: {
    height: 48,
  },
});
