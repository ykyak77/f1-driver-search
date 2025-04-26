// URL base da API OpenF1
import { useState } from 'react';
import { Link } from 'react-router-dom';
import "../style.css";

function App() {
  const [modoBusca, setModoBusca] = useState('');
  const [driverName, setDriverName] = useState('');
  const [driverNumber, setDriverNumber] = useState('');
  const [pilotos, setPilotos] = useState([]);
  const [erro, setErro] = useState('');

  const limparResultado = () => {
    setPilotos([]);
    setErro('');
  };

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

      // Verifique se a resposta é JSON
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();

        if (!data || data.length === 0 || data.message) {
          setErro('Nenhum dado encontrado.');
          setPilotos([]);
        } else {
          setPilotos(data);
          setErro('');
        }
      } else {
        throw new Error("Resposta não é JSON");
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setErro('Erro ao buscar os dados!');
      setPilotos([]);
    }
  };

  return (
    <>
      <div id="back">
        <Link to="/">Voltar</Link>
      </div>

      <h1 className="titulo">Consultar Piloto por:</h1>

      <form id="pilotForm" onSubmit={buscarPiloto}>
        {modoBusca === 'nome' && (
          <div id="nameField">
            <label htmlFor="driverName">Primeiro Nome do Piloto:</label>
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
          <div id="numberField">
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

      {(pilotos.length > 0 || erro) && (
        <div id="result">
          {erro ? (
            <p>{erro}</p>
          ) : (
            <div>
              <h2>Informações do Piloto:</h2>
              {pilotos.map((piloto, index) => (
                <div key={index}>
                  <p><strong>Nome Completo:</strong> {piloto.full_name || 'Desconhecido'}</p>
                  <p><strong>Primeiro Nome:</strong> {piloto.first_name || 'Desconhecido'}</p>
                  <p><strong>Sobrenome:</strong> {piloto.last_name || 'Desconhecido'}</p>
                  <p><strong>Sigla de Transmissão:</strong> {piloto.name_acronym || 'Desconhecido'}</p>
                  <p><strong>País de origem:</strong> {piloto.country_code || 'Desconhecido'}</p>
                  <p><strong>Equipe:</strong> {piloto.team_name || 'Sem equipe'}</p>
                  <p><strong>Número do Piloto:</strong> {piloto.driver_number || 'N/A'}</p>
                  {piloto.headshot_url && (
                    <img src={piloto.headshot_url} alt={piloto.full_name} width="150" />
                  )}
                </div>
              ))}
            </div>
          )}
          <button className="btn1" onClick={limparResultado}>Fechar</button>
        </div>
      )}
    </>
  );
}

export default App;