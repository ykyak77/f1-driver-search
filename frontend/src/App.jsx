import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Pesquisa from './pages/pesquisa';
import Game from './pages/game';
import './style.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pesquisa" element={<Pesquisa />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
