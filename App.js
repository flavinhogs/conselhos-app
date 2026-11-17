
import React, { useState } from 'react';

import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native';

export default function App() {

  const [conselho, setConselho] = useState(
    'Clique no botão para receber um conselho.'
  );
  const [id, setId] = useState(null);

  const [carregando, setCarregando] = useState(false);

  async function buscarConselho() {
    setCarregando(true);

    try {
      const resposta = await fetch(
        'https://api.adviceslip.com/advice?t=' + Date.now
      );

      const dados = await resposta.json();

      setConselho(dados.slip.advice);
      setId(dados.slip.id);

    } catch (erro) {
      setConselho('Não foi possível carregar o conselho.');
    }

    setCarregando(false);
  }

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>
        Seu conselho diário
      </Text>

      <Text style={styles.conselho}>
        {conselho}
      </Text>

      <Text>
  ID do conselho: {id ?? 'Nenhum conselho carregado'}
</Text>

      <Button
        title={carregando ? 'Carregando...' : 'Novo conselho'}
        onPress={buscarConselho}
        disabled={carregando}
      />

      <Button
        title="Atualizar conselho"
        onPress={buscarConselho}
        disabled={carregando}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#EAF0EC',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#183B36',
    marginBottom: 30,
  },

  conselho: {
    fontSize: 20,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 30,
  },

});
