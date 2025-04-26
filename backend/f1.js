// importando as dependências necessárias
const express = require('express'); // framework para construir o servidor
const axios = require('axios'); // cliente HTTP para fazer requisições à API externa
const cors = require('cors'); // para habilitar CORS e permitir acesso de outras origens

// inicializando a aplicação Express
const app = express();
const PORT = process.env.PORT || 3000; // definir porta de servidor como 3000
const session_key = 'latest'; // Sempre usar a chave "latest" para todas as requisições
const BASE_URL = 'https://api.openf1.org/v1/drivers';

// habilitando CORS para permitir requisições de qualquer origem
app.use(cors());

// rota para buscar dados dos pilotos
app.get('/search', async (req, res) => {
  // extraindo os parâmetros da query string: primeiro nome e número do piloto
  const { first_name, driver_number } = req.query;

  // verificando se nenhum critério de busca foi fornecido (nome ou número)
  if (!first_name && !driver_number) {
    return res.status(400).json({ error: 'Erro: é necessário fornecer pelo menos um critério de busca.' });
  }

  try {
    // construindo a URL da requisição à API, incluindo a chave da sessão
    let url = `${BASE_URL}?session_key=${session_key}`;

    // adicionando o nome à URL, caso tenha sido informado
    if (first_name) {
      url += `&first_name=${encodeURIComponent(first_name)}`;
    }
    // adicionando o número do piloto à URL, caso tenha sido ele informado
    if (driver_number) {
      url += `&driver_number=${encodeURIComponent(driver_number)}`;
    }

    console.log("URL que será requisitada para a API:", url);

    // realizando a requisição GET à API com a URL gerada
    const response = await axios.get(url);
    const data = response.data; // armazenando os dados recebidos da API

    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'Nenhum dado encontrado para o critério especificado.' });
    }

    // enviando os dados recebidos da API de volta como resposta JSON
    return res.json(data);
  } catch (error) {
    // Caso ocorra um erro
    console.error('Erro ao buscar dados do piloto:', error);
    return res.status(500).json({ error: 'Erro ao buscar dados do piloto.' });
  }
});

// Rota para obter dados dos pilotos
app.get('/pilotos', async (req, res) => {
  try {
    // Realizando a requisição com axios
    const response = await axios.get(BASE_URL); // URL da API OpenF1
    const data = response.data; // armazenando os dados recebidos da API

    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'Nenhum dado encontrado para os pilotos.' });
    }

    // enviando os dados recebidos da API de volta como resposta JSON
    return res.json(data);

  } catch (error) {
    console.error('Erro ao buscar pilotos:', error);
    res.status(500).json({ error: 'Erro ao buscar dados dos pilotos' });
  }
});

// inicia o servidor
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`); // exibe mensagem de confirmação no console
});