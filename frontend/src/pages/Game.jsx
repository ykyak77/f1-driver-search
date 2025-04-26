import { Link } from 'react-router-dom'; 
import { useEffect, useState } from 'react'; // hook useState
import '../style.css'; 

function Game() {
  // definindo estados iniciais com o hook useState
  const [modo, setModo] = useState('pre'); // modo do jogo tela de início
  const [pilotosRestantes, setPilotosRestantes] = useState([]); // lista de pilotos restantes
  const [piloto, setPiloto] = useState(null); // piloto sorteado atual
  const [resposta, setResposta] = useState(''); // resposta do usuário
  const [status, setStatus] = useState('jogando'); // status do jogo (jogando, acertou, errou)
  const [timer, setTimer] = useState(10); // tempo restante no jogo
  const [acertos, setAcertos] = useState(0); // contador de acertos do jogador
  const [dificuldade, setDificuldade] = useState(null); // nivel de dificuldade do jogo
  const [carregando, setCarregando] = useState(false); // controle de carregamento (exibe carregando...)
  const tempoGame ={ facil: 15, medio: 10, dificil: 5 }; // tempo de jogo baseado na dificuldade
  const acertosNecessarios = { facil: 5, medio: 10, dificil: 20 }; // acertos necessários para vencer baseado na dificuldade

  // função que inicia o jogo, recebe o nível de dificuldade
  const iniciarJogo = async (nivel) => {
    setCarregando(true); // ativa o carregamento
    try {
      // requisição para obter dados dos pilotos da API OpenF1
      const res = await fetch('http://localhost:3000/pilotos');//nao precisa mexer direto na API f1.js
      const data = await res.json(); // converte a resposta para JSON
      setPilotosRestantes(data); // armazena os pilotos restantes
      setModo('jogando'); // define o modo como "jogando"
      setDificuldade(nivel); // define a dificuldade escolhida

      // chama a função para sortear o primeiro piloto
      sortearPiloto(data, tempoGame[nivel]);
    } catch (error) {
      // caso haja erro na requisição exibe no console
      console.error('Erro ao iniciar o jogo:', error);
    } finally {
      // desativa o carregamento, independente de sucesso ou falha
      setCarregando(false);
    }
  };

  // função para sortear um piloto aleatório da lista
  const sortearPiloto = (lista, tempoGame) => {
    const novaLista = [...lista]; // cria uma copia da lista de pilotos
    const index = Math.floor(Math.random() * novaLista.length); // sorteia um índice aleatório
    const escolhido = novaLista.splice(index, 1)[0]; // remove o piloto sorteado da lista
    setPiloto(escolhido); // define o piloto sorteado
    setPilotosRestantes(novaLista); // atualiza a lista de pilotos restantes
    setResposta(''); // reseta a resposta do jogador
    setStatus('jogando'); // muda o status para "jogando"
    setTimer(tempoGame); // define o tempo inicial do jogo
  };

  // efeito para controlar o timer do jogo
  useEffect(() => {
    // se não estiver no modo "jogando", não faz nada
    if (modo !== 'jogando') return;
    
    // se o timer chegar a zero, o jogo termina e o status muda para "errou"
    if (timer === 0) {
      setModo('errou');
      return;
    }

    // decrementa o timer a cada segundo
    const intervalo = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    // limpeza do intervalo quando o componente é desmontado ou o timer mudar
    return () => clearInterval(intervalo);
  }, [timer, modo]);

  // função para verificar se a resposta do jogador está correta
  const verificar = () => {
    // compara a resposta do jogador com o numero do carro do piloto
    if (resposta === String(piloto.driver_number)) {
      const novosAcertos = acertos + 1; // incrementa o numero de acertos
      setAcertos(novosAcertos);

      // Checa se o número de acertos atingiu o mínimo para vencer
      if (novosAcertos >= acertosNecessarios[dificuldade]) {
        setModo('vitoria'); // se venceu, muda o modo para "vitoria"
        return;
      }

      // verifica se não ha mais pilotos restantes
      if (pilotosRestantes.length === 0) {
        setModo('vitoria'); // se não há mais pilotos, tambem vence
        return;
      }

      setStatus('acertou'); // caso acerte, exibe "acertou"
      setTimeout(() => sortearPiloto(pilotosRestantes, tempoGame[dificuldade]), 1000); // sorteia um novo piloto após 1 segundo
    } else {
      setStatus('errou'); // se errar, o status vira "errou"
      setModo('errou'); // muda o modo para "errou"
    }
  };

  // função para capturar o evento de pressionamento da tecla "Enter"
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      verificar(); // quando "Enter" é pressionado, verifica a resposta
    }
  };

  // se o jogo ainda estiver no estado "pré-jogo", exibe as opções de dificuldade
  if (modo === 'pre') {
    return (
      <div className="game-container">

        {/* mesma div de pesquisar  */}
        <div id="back">
          <Link to="/">Voltar</Link>
        </div>

        <h1 className="titulo">🎮 Formula 1 Game 🎮</h1>
        <p>Adivinhe o número do carro do piloto que <br/> aparecer e mostre seus conhecimentos!</p>
        <h3 className='subtitulo'>Escolha a dificuldade:</h3>
        {carregando ? ( // exibe "Carregando..." se estiver carregando
          <p>Carregando...</p>
        ) : (
          <>
            <button className="btn-dificuldade" onClick={() => iniciarJogo('facil')} disabled={carregando}>Fácil</button>
            <button className="btn-dificuldade" onClick={() => iniciarJogo('medio')} disabled={carregando}>Médio</button>
            <button className="btn-dificuldade" onClick={() => iniciarJogo('dificil')} disabled={carregando}>Difícil</button>
          </>
        )}
      </div>
    );
  }

  // se o piloto ainda não foi sorteado, exibe "Carregando..."
  if (!piloto) return <p>Carregando...</p>;

  // se o modo for "vitoria", exibe a tela de vitória
  if (modo === 'vitoria') {
    return (
      <div className="game-container">
        <h1 className="titulo">🏆 Parabéns! 🏆</h1>
        <img className='img-game' src="/img/vitoria.jpg" alt="trofeu" />
        <h3 className='subtitulo'>Você acertou {acertos} {acertos === 1 ? 'piloto' : 'pilotos'}!</h3>
        <button onClick={() => window.location.reload()}>Jogar Novamente</button>
      </div>
    );
  }

  // se o modo for "errou", exibe a tela de game over
  if (modo === 'errou') {
    return (
      <div className="game-container">
        <h1 className="titulo">❌ Game Over ❌</h1>
        <p>O número correto era: {piloto.driver_number}</p>
        <img className='img-game' src="/img/derrota.png" alt="max-triste" />
        <h3 className='subtitulo'>Você acertou {acertos} {acertos === 1 ? 'piloto' : 'pilotos'}.</h3>
        <button onClick={() => window.location.reload()}>Recomeçar</button>
      </div>
    );
  }

  // tela principal do jogo
  return (
    <div className="game-container">
      <h1 className="titulo">Adivinhe o Número do Piloto</h1>
      <p className="timer">⏳ Tempo restante: {timer}s</p>

      <div className="piloto-card">
        {piloto.headshot_url && <img src={piloto.headshot_url} alt={piloto.full_name} className="piloto-img" />}
        <h2 className="nome-piloto">{piloto.full_name}</h2>
      </div>

      {status === 'jogando' && (
        <div className="input-box">
          <label htmlFor="resposta">Número do Carro:</label>
          <input
            id="resposta"
            type="number"
            value={resposta}
            onChange={(e) => setResposta(e.target.value)} // Atualiza o estado da resposta
            placeholder="Digite aqui..."
            className="input-numero"
            autoFocus // auto-foco no campo de entrada
            onKeyDown={handleKeyPress} // detecta o pressionamento da tecla Enter
          />
          <button onClick={verificar} className="btn-enviar">Enviar</button>
        </div>
      )}

      {status === 'acertou' && <p className="acertou">✅ Acertou! Próximo piloto...</p>}
    </div>
  );
}

export default Game;
