// função para buscar os dados do piloto com base no tipo de pesquisa selecionado
// espera o DOM ser carregado antes de executar os scripts
document.addEventListener("DOMContentLoaded", function() {
    // alterna a exibição dos campos com base no botão clicado
    document.getElementById("btnNome").addEventListener("click", function() {
        // exibe o campo de nome e esconde o campo de número
        document.getElementById("nameField").style.display = "block";
        // esconde o campo para buscar pelo número do piloto
        document.getElementById("numberField").style.display = "none";
        // limpa o campo de número do piloto, caso tenha sido preenchido
        document.getElementById("driverNumber").value = "";
    });
    document.getElementById("btnNumero").addEventListener("click", function() {
        // exibe o campo de número e esconde o campo de nome
        document.getElementById("numberField").style.display = "block";
        // esconde o campo para buscar pelo nome do piloto
        document.getElementById("nameField").style.display = "none";
        // limpa o campo do nome do piloto, caso tenha sido preenchido
        document.getElementById("driverName").value = "";
    });

    // evento de submit do formulário
    document.getElementById('pilotForm').addEventListener('submit', async function(event) {
        event.preventDefault(); // impede o envio do formulário padrão (para que a página não seja recarregada)

        let searchParam = '';// armazena o parâmetro de pesquisa
        let queryParam = ''; // armazena o valor da pesquisa

        // captura apenas o campo que estiver preenchido
        const firstName = document.getElementById('driverName').value.trim();
        const driverNumber = document.getElementById('driverNumber').value.trim();

        if (firstName) {
             // se o nome foi preenchido, usa "first_name" como parâmetro de busca na url
            searchParam = 'first_name';
            queryParam = firstName;
        } else if (driverNumber) { 
            // se o número do piloto foi preenchido, usa "driver_number" como parâmetro de busca na url
            searchParam = 'driver_number';
            queryParam = driverNumber;
        } else {
            // alerta de erro caso não tenha nada preenchido
            alert('Campo obrigatório não preenchido');
            return;
        }

        try {
            // envia requisição para o servidor com o parâmetro de pesquisa
            let url = `http://localhost:3000/search?${searchParam}=${queryParam}&session_key=latest`;

            // realiza a requisição assíncrona usando fetch
            const response = await fetch(url);
            const data = await response.json();

            // verifica se ha dados retornados
            if (!data || data.length === 0) {
                // mensagem de erro caso não tenha dados
                document.getElementById('result').innerHTML = `<p>Nenhum dado encontrado.</p>`;
                return;
            }

            // exibe os dados do piloto se encontrados
            let resultHTML = `<h2>Informações do Piloto:</h2>`;
            data.forEach(piloto => {
                resultHTML += `
                    <strong>Nome Completo:</strong> ${piloto.full_name || 'Desconhecido'} <br>
                    <strong>Primeiro Nome:</strong> ${piloto.first_name || 'Desconhecido'} <br>
                    <strong>Sobrenome:</strong> ${piloto.last_name || 'Desconhecido'} <br>
                    <strong>Sigla de Transmissão:</strong> ${piloto.name_acronym || 'Desconhecido'} <br>
                    <strong>País de origem:</strong> ${piloto.country_code || 'Desconhecido'} <br>
                    <strong>Equipe:</strong> ${piloto.team_name || 'Sem equipe'} <br>
                    <strong>Número do Piloto:</strong> ${piloto.driver_number || 'N/A'} <br>
                    ${piloto.headshot_url ? `<img src="${piloto.headshot_url}" alt="${piloto.full_name}" width="150">` : ''} <br>
                    <button class="btn1" id="btnVoltar" type="button" onclick="limparResultado()">Fechar</button>
                `;
            });
            resultHTML += ``;
            document.getElementById('result').innerHTML = resultHTML;
        } catch (error) {
            console.error('Erro na requisição:', error);
            document.getElementById('result').innerHTML = `<p">Erro ao buscar os dados!!</p>`;
        }
    });
});

// função para limpar o resultado exibido
function limparResultado() {
    document.getElementById('result').innerHTML = '';  // limpa o conteúdo exibido
}