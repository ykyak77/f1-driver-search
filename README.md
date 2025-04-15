# [![Typing SVG](https://readme-typing-svg.demolab.com/?lines=Bem+vindo;Me+sigam+nas+redes+sociais)](https://github.com/ykyak77)

# 🏁🏎 F1 Driver Search and Minigame 

Este repositório contém um jogo interativo onde o jogador deve adivinhar o número do carro do pilotos de Fórmula 1, baseado em seu nome e foto. E um sistema simples de consulta de pilotos de Fórmula 1. A aplicação utiliza dados em tempo real da [API OpenF1](https://openf1.org/), com um front-end desenvolvido em React + Vite, e um back-end construído com Node.js + Express.

---

## 🎮 Funcionalidades

- Tela de seleção de dificuldade: Fácil (15s), Médio (10s), Difícil (5s)
- O sistema exibe aleatoriamente 1 entre 20 pilotos únicos da sessão atual
- O jogador precisa adivinhar corretamente o número do carro
- Acertos continuam o jogo com novo piloto
- Erros ou fim do tempo resultam em "Game Over"
- Vitória ao acertar os 20 pilotos sem errar
- **Busca por Primeiro Nome**: Você pode pesquisar pilotos inserindo o primeiro nome na caixa de texto. Ex: Max
- **Busca por Número do Piloto**: Também é possível realizar a pesquisa usando o número do piloto. Ex: 5
- **Exibição de Dados do Piloto**: Após a pesquisa, serão exibidos dados como nome completo, equipe, número do piloto e a foto, se disponível.
- **Interação com a API OpenF1**: O backend faz uma requisição à API OpenF1 para recuperar os dados dos pilotos.


---

## 🏗️ Estrutura do Projeto

```
f1-driver-search/
├── backend/
│   ├── f1.js           # API em Express
│   └── package.json    # Dependências do backend
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Game.jsx
|   |   |   ├── Home.jsx
|   |   |   └── Pesquisa.jsx
│   │   └── style.css
|   └──
├── package-lock
└── package
```

---

## 🚀 Como Rodar o Projeto

### Clone este repositório em seu computador:

    
    git clone https://github.com/ykyak77/f1-driver-search
    cd f1-driver-search 


### 🔧 Backend (API Express)


```bash
cd backend
npm install
```

### 💻 Frontend (React + Vite)

```bash
cd frontend
npm install
```

### 🛰 Execultar o projeto
```bash
cd ..
npm install 
npm run dev
```
Frontend disponível em: `http://localhost:5173`

---

# 🪓 Feramentas Utilizadas
## 💻 Frontend:

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000000)


## 🔧 Backend:
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=ffffff)

![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=ffffff)

![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=ffffff)

## 🛰 API Utilizada
[![OpenF1](https://img.shields.io/badge/OpenF1-005F56?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIHZlcnNpb249IjEu1YMXALzY...wvZz4=)](https://openf1.org)

---
## 👨‍💻 Sobre mim
Sou Kayky, atualmente no terceiro semestre da faculdade de Análise e Desenvolvimento de Sistemas no Instituto Federal de São Paulo (IFSP) - (03/2025). Durante uma das minhas aulas, surgiu a proposta de criar uma aplicação que integrasse APIs externas, facilitando consultas. Foi assim que nasceu este projeto, uma fusão da minha paixão por automobilismo com a vontade de aprender e aprimorar minhas habilidades, especialmente no desenvolvimento backend.

---

## 🧾 Licença

Este projeto está sob a licença MIT — sinta-se livre para usar, modificar e compartilhar!

---

# 📞 Conecte-se comigo

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/kayky-henrique-86b262276/)

[![Gmail](https://img.shields.io/badge/Gmail-333333?style=for-the-badge&logo=gmail&logoColor=red)](kaykyhenrique705@gmail.com)

[![Instagram](https://img.shields.io/badge/-Instagram-%23E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/ykyak77/)

[![X/Twitter](https://img.shields.io/badge/X-000?style=for-the-badge&logo=x)](https://x.com/ykyak77)

