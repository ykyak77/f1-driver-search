// importando as dependências necessárias
const express = require('express'); // framework para construir o servidor
const axios = require('axios'); // cliente HTTP para fazer requisições à API externa

// inicializando a aplicação Express
const app = express();
const PORT = process.env.PORT || 3000; // definir porta de servidor como 3000
const session_key = 'latest'; // Sempre usar a chave "latest" ara todas as requisições

//permitindo que qualquer origem acesse a sua API.
const cors = require('cors');
app.use(cors());

// inicia o servidor
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`); // exibe mensagem de confirmação no console
});