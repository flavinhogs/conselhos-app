
import React, { useCallback, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';

import {
  buscarFavoritos,
  removerFavorito,
} from '../services/favoritesStorage';

export default function FavoritesScreen() {
  const [favoritos, setFavoritos] = useState([]);

  useFocusEffect(
    useCallback(() => {
      async function carregarFavoritos() {
        const dados = await buscarFavoritos();
        setFavoritos(dados);
      }

      carregarFavoritos();
    }, [])
  );

  async function excluirFavorito(id) {
    const atualizados = await removerFavorito(id);

    if (atualizados) {
      setFavoritos(atualizados);
    }
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.titulo}>
        Seus favoritos
      </Text>

      <Text variant="bodyMedium" style={styles.descricao}>
        Guarde aqui os conselhos que fazem sentido para você.
      </Text>

      {favoritos.length === 0 ? (
        <View style={styles.vazio}>
          <Text style={styles.iconeVazio}>♡</Text>
          <Text variant="titleMedium" style={styles.textoVazio}>
            Nenhum conselho salvo
          </Text>
          <Text variant="bodyMedium" style={styles.descricaoVazio}>
            Volte à tela inicial e salve seus conselhos preferidos.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favoritos}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.lista}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Content>
                <Text style={styles.iconeCard}>❝</Text>

                <Text variant="bodyLarge" style={styles.conselho}>
                  {item.advice}
                </Text>

                <Text variant="labelSmall" style={styles.id}>
                  CONSELHO Nº {item.id}
                </Text>

                <Button
                  mode="text"
                  textColor="#B00020"
                  onPress={() => excluirFavorito(item.id)}
                >
                  Remover dos favoritos
                </Button>
              </Card.Content>
            </Card>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  titulo: {
    color: '#183B36',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 12,
  },
  descricao: {
    color: '#66756F',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  lista: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    marginBottom: 16,
    elevation: 2,
  },
  iconeCard: {
    fontSize: 32,
    color: '#91AA9D',
    textAlign: 'center',
  },
  conselho: {
    color: '#183B36',
    textAlign: 'center',
    fontSize: 17,
    lineHeight: 26,
    marginVertical: 14,
  },
  id: {
    color: '#8A9992',
    textAlign: 'center',
    marginBottom: 8,
  },
  vazio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconeVazio: {
    fontSize: 65,
    color: '#91AA9D',
  },
  textoVazio: {
    color: '#183B36',
    marginTop: 12,
  },
  descricaoVazio: {
    color: '#66756F',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },
});
