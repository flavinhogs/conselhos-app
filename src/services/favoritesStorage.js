
import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_FAVORITOS = '@conselhos_app:favoritos';

export async function buscarFavoritos() {
  try {
    const dados = await AsyncStorage.getItem(CHAVE_FAVORITOS);

    return dados ? JSON.parse(dados) : [];
  } catch (erro) {
    console.log('Erro ao buscar favoritos:', erro);
    return [];
  }
}

export async function salvarFavorito(conselho) {
  try {
    const favoritos = await buscarFavoritos();

    const jaExiste = favoritos.some(
      item => item.id === conselho.id
    );

    if (jaExiste) {
      return false;
    }

    const atualizados = [...favoritos, conselho];

    await AsyncStorage.setItem(
      CHAVE_FAVORITOS,
      JSON.stringify(atualizados)
    );

    return true;
  } catch (erro) {
    console.log('Erro ao salvar favorito:', erro);
    return false;
  }
}

export async function removerFavorito(id) {
  try {
    const favoritos = await buscarFavoritos();

    const atualizados = favoritos.filter(
      item => item.id !== id
    );

    await AsyncStorage.setItem(
      CHAVE_FAVORITOS,
      JSON.stringify(atualizados)
    );

    return atualizados;
  } catch (erro) {
    console.log('Erro ao remover favorito:', erro);
    return null;
  }
}
