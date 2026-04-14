# Sprint Planning: Cartões de Desenvolvimento Frontend (Kanban)

Aqui combinamos as ideias do negócio (Brainstorm - BP) com uma divisão técnica (Sprint Planning - SP) detalhada. 
O foco aqui é a **criação visual (UI) e integração básica de mapa**. O fluxo traseiro (banco de dados/sinal) não entra nesta primeira rodada.

---

## 📌 EPIC 1: Primeiras Impressões e Autenticação
*Objetivo: Construir as telas vitrine do app e garantir que os formulários sigam o príncipio do alto contraste e botões grandes (acessibilidade).*

### 🏷️ CARD 1.1: Visual da Splash Screen
* **O que fazer:** Edição na rota `/splash`.
* **Tarefas Técnicas:** 
  1. Centralizar no `splash.page.html` o logotipo e nome "Vaga TA".
  2. Aplicar as cores do projeto em `splash.page.scss`.
  3. Adicionar 2 botões grandes com diretivas do Ionic (`<ion-button>`): "Entrar" e "Sou PCD e Quero me Cadastrar".

### 🏷️ CARD 1.2: Formulário de Login
* **O que fazer:** Edição na rota `/login`.
* **Tarefas Técnicas:**
  1. No `login.page.html`: Criar `<ion-input>` para E-mail e Senha. 
  2. Ajustar *touch targets* (deixar as bordas dos inputs grossas e fonte grande).
  3. Colocar link/botão "Esqueci minha senha" sob o forms.

### 🏷️ CARD 1.3: Tela de Cadastro (Onboard Pessoal e Veicular)
* **O que fazer:** Edição na rota `/register`.
* **Tarefas Técnicas:**
  1. Criar layout no estilo formulário escada. 
  2. Inputs essenciais: Nome, Email, Senha, Placa do Carro.
  3. Input principal: **Número da Credencial**.
  4. Botão maciço no rodapé: "Criar minha conta."

---

## 📌 EPIC 2: O Coração do Desbloqueio (Home/Mapa)
*Objetivo: Integrar as geolocalizações visuais das vagas e o botão mestre que enviará e acionará a cancela/receptor.*

### 🏷️ CARD 2.1: Mapa Base na Tela Core
* **O que fazer:** Edição na rota `/home`.
* **Tarefas Técnicas:**
  1. Importar estrutura `div` base em `home.page.html` que alocará o mapa.
  2. Construir no `home.page.ts` o ciclo de vida (LifeCycle `ionViewDidEnter`) inicializando o mapa Leaflet para gerar focos estáticos.
  3. Fazer o *Mock* (simulação com pino no mapa) mostrando onde ficariam os receptores PCD para teste acadêmico.

### 🏷️ CARD 2.2: Interação principal (Bottom Sheet & Emitir Sinal)
* **O que fazer:** Também na `/home`, interações via modal de rodapé nativo.
* **Tarefas Técnicas:**
  1. Usar o `<ion-modal>` com o comportamento de `bottom-sheet` (aba flutuante) para ficar sempre aparente embaixo da tela.
  2. Inserir o botão gigante: **"EMITIR SINAL - LIBERAR VAGA"**, com ícones indicativos grandes usando o `ionicons`.

---

## 📌 EPIC 3: Contorno de Arestas
*Objetivo: Funcionalidades secundárias de gerenciamento.*

### 🏷️ CARD 3.1: Tela de Perfil e Reset
* **Tarefas Técnicas:** 
  1. Montar visual da aba Perfil (`/profile`): Dados fixos com a credencial, alterar Placa de veículo, e Botão Sair da Conta.
  2. Fazer tela esqueci-a-senha (`forgot-password.page.html`) com um visual ultra simples de 1 Input só de e-mail.
