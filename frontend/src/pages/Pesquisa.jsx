import { useState } from 'react';
import { Link } from 'react-router-dom'; 
import "../style.css";

function App() {
  const [modoBusca, setModoBusca] = useState(''); // 'nome' ou 'numero'
  const [driverName, setDriverName] = useState('');
  const [driverNumber, setDriverNumber] = useState('');
  const [resultado, setResultado] = useState('');


  const limparResultado = () => setResultado('');

  const buscarPiloto = async (event) => {
    event.preventDefault();

    let searchParam = '';
    let queryParam = '';

    if (modoBusca === 'nome' && driverName.trim()) {
      searchParam = 'first_name';
      queryParam = driverName.trim();
    } else if (modoBusca === 'numero' && driverNumber.trim()) {
      searchParam = 'driver_number';
      queryParam = driverNumber.trim();
    } else {
      alert('Campo obrigatório não preenchido');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/search?${searchParam}=${queryParam}`);
      const data = await response.json();

      if (!data || data.length === 0) {
        setResultado('<p>Nenhum dado encontrado.</p>');
        return;
      }

      let resultHTML = `<h2>Informações do Piloto:</h2>`;
      data.forEach((piloto) => {
        resultHTML += `
          <strong>Nome Completo:</strong> ${piloto.full_name || 'Desconhecido'} <br>
          <strong>Primeiro Nome:</strong> ${piloto.first_name || 'Desconhecido'} <br>
          <strong>Sobrenome:</strong> ${piloto.last_name || 'Desconhecido'} <br>
          <strong>Sigla de Transmissão:</strong> ${piloto.name_acronym || 'Desconhecido'} <br>
          <strong>País de origem:</strong> ${piloto.country_code || 'Desconhecido'} <br>
          <strong>Equipe:</strong> ${piloto.team_name || 'Sem equipe'} <br>
          <strong>Número do Piloto:</strong> ${piloto.driver_number || 'N/A'} <br>
          ${piloto.headshot_url ? `<img src="${piloto.headshot_url}" alt="${piloto.full_name}" width="150">` : ''}
          <br><br>
         `;
      });

      setResultado(resultHTML);
    } catch (error) {
      console.error('Erro na requisição:', error);
      setResultado('<p>Erro ao buscar os dados!</p>');
    }
  };

  return (
    <>
      <div id="back">
        <Link to="/">Voltar</Link>
      </div>

      <h1 class="titulo">Consultar Piloto por:</h1>

      <form id="pilotForm" onSubmit={buscarPiloto}>

        {modoBusca === 'nome' && (
          <div id="nameField" style={{ display: modoBusca === 'nome' ? 'block' : 'none' }}>
            <label  htmlFor="driverName">Primeiro Nome do Piloto:</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="driverName"
                name="driverName"
                placeholder="Digite o primeiro nome do piloto..."
                value={driverName}
                onChange={(e) => setDriverName(e.target.value)}
              />
              <button className="btn2" type="submit">
                <img className="icon-lupa" src="/img/lupa.png" alt="lupa pesquisa" />
              </button>
            </div>
          </div>
        )}

        {modoBusca === 'numero' && (
          <div id="numberField" style={{ display: modoBusca === 'numero' ? 'block' : 'none' }}>
            <label htmlFor="driverNumber">Número do Piloto:</label>
            <div className="input-wrapper">
              <input
                type="number"
                id="driverNumber"
                name="driverNumber"
                placeholder="Digite o número do piloto..."
                value={driverNumber}
                onChange={(e) => setDriverNumber(e.target.value)}
              />
              <button className="btn2" type="submit">
                <img className="icon-lupa" src="/img/lupa.png" alt="lupa pesquisa" />
              </button>
            </div>
          </div>
        )}

        <div>
          <button
            className="btn1"
            id="btnNome"
            type="button"
            onClick={() => {
              setModoBusca('nome');
              setDriverNumber('');
              limparResultado();
            }}
          >
            Primeiro Nome
          </button>
          <button
            className="btn1"
            id="btnNumero"
            type="button"
            onClick={() => {
              setModoBusca('numero');
              setDriverName('');
              limparResultado();
            }}
          >
            Número
          </button>
        </div>
      </form>

    {resultado && (
      <div id="result">
        <div dangerouslySetInnerHTML={{ __html: resultado }} />
        <button className="btn1" onClick={limparResultado}>Fechar</button>
      </div>
    )}

    </>
  );
}

export default App;
