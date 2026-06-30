# 🚗 Acesso Livre

Aplicativo mobile desenvolvido em **Angular + Ionic** com o objetivo de auxiliar na utilização de vagas exclusivas para Pessoas com Deficiência (PCD), permitindo a comunicação entre o smartphone do usuário e um dispositivo **ESP32** instalado na vaga por meio da tecnologia **Bluetooth Low Energy (BLE)**.

O projeto foi desenvolvido como parte de um trabalho acadêmico, tendo como principal objetivo demonstrar uma solução tecnológica para tornar o acesso às vagas PCD mais seguro, acessível e automatizado.

---

# 📋 Funcionalidades

* Login de usuários
* Cadastro de novos usuários PCD
* Recuperação de senha
* Visualização de vagas em mapa interativo
* Localização do usuário
* Seleção de vagas disponíveis
* Comunicação via Bluetooth Low Energy (BLE)
* Liberação da vaga através do ESP32
* Área administrativa para cadastro de funcionários autorizados
* Cadastro de novas vagas de estacionamento

---

# 🏗️ Arquitetura

O aplicativo foi desenvolvido utilizando uma arquitetura baseada em componentes do Angular juntamente com o Ionic Framework.

```
Angular
     │
     ▼
Ionic Framework
     │
     ▼
Interface Mobile
     │
     ▼
Bluetooth Low Energy (BLE)
     │
     ▼
ESP32
     │
     ▼
Sistema de Liberação da Vaga
```

---

# 🛠️ Tecnologias Utilizadas

* Angular
* Ionic Framework
* TypeScript
* HTML5
* SCSS
* Capacitor
* Android Studio
* Leaflet
* Bluetooth Low Energy (BLE)
* ESP32

---

# 📱 Fluxo de Utilização

```text
Abertura do aplicativo
        │
        ▼
Solicitação das permissões Bluetooth
        │
        ▼
Splash Screen
        │
        ▼
Tela de Login / Cadastro
        │
        ▼
Autenticação
        │
        ▼
Tela Principal (Mapa)
        │
        ▼
Seleção da vaga
        │
        ▼
Pareamento BLE
        │
        ▼
Confirmação do usuário
        │
        ▼
Envio do comando
        │
        ▼
ESP32 libera a vaga
```

---

# 🗺️ Mapa

O mapa foi implementado utilizando a biblioteca **Leaflet**, responsável por exibir:

* Localização atual do usuário;
* Vagas monitoradas pelo sistema;
* Seleção da vaga desejada;
* Atualização dinâmica dos marcadores.

---

# 📶 Comunicação Bluetooth

A comunicação entre o aplicativo e o sistema embarcado é realizada utilizando **Bluetooth Low Energy (BLE)**.

Cada ESP32 permanece anunciando sua presença utilizando um identificador exclusivo.

Após selecionar uma vaga no mapa, o aplicativo:

1. Procura o ESP32 correspondente;
2. Realiza o pareamento BLE;
3. Estabelece a conexão;
4. Aguarda a confirmação do usuário;
5. Envia o comando de liberação.

O firmware do ESP32 interpreta esse comando e realiza o acionamento do sistema responsável pela liberação da vaga.

---

# 🔐 Área Administrativa

O sistema também prevê um perfil administrativo.

Nesse perfil é possível:

* Cadastrar funcionários autorizados;
* Cadastrar novas vagas;
* Expandir o sistema para novos estacionamentos.

Os funcionários cadastrados (como seguranças ou porteiros) possuem autorização para liberar uma vaga temporariamente para um usuário que ainda não possua acesso ao aplicativo.

---

# ♿ Acessibilidade

Durante o desenvolvimento foram adotados diversos princípios de UX e acessibilidade:

* Botões com grandes áreas de toque;
* Alto contraste entre os elementos;
* Interface intuitiva;
* Poucas etapas para liberar uma vaga;
* Componentes responsivos;
* Navegação simplificada.

---

# ⚠️ Observações

Este projeto foi desenvolvido para fins acadêmicos.

Algumas funcionalidades foram implementadas como protótipo, incluindo:

* Integração com APIs governamentais para validação de CPF e credencial PCD;
* Banco de dados definitivo;
* Persistência de usuários;
* Recuperação real de senha.

Toda a arquitetura foi planejada para suportar essas funcionalidades em futuras versões.

---

# 🚀 Executando o Projeto

## Instalação das dependências

```bash
npm install
```

## Executar em ambiente de desenvolvimento

```bash
ionic serve
```

## Gerar build Android

```bash
ionic build
ionic cap sync android
ionic cap open android
```

Após abrir o Android Studio, basta compilar o projeto normalmente.

---

# 📁 Estrutura do Projeto

```text
src/
 ├── app/
 │   ├── splash/
 │   ├── login/
 │   ├── register/
 │   ├── forgot-password/
 │   ├── home/
 │   ├── profile/
 │   └── app.routes.ts
 ├── assets/
 ├── environments/
 └── theme/
```

---

# 👨‍💻 Desenvolvido por

Projeto desenvolvido como trabalho acadêmico utilizando Angular, Ionic e ESP32 para demonstração de um sistema inteligente de gerenciamento de vagas acessíveis.
