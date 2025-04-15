import { Link } from 'react-router-dom';
import "../style.css";

function Home() {
  return (
    <div>
      <h1 className='titulo'>Bem-vindo à OpenF1 Explorer!</h1>
      <div id='caixa-paginas'>
        <nav >
          <Link to="/">Home</Link>
          <Link to="/pesquisa">Buscar Piloto</Link>
          <Link to="/game">Jogo</Link>
        </nav>
      </div>
    </div>
  );
}

export default Home;

  