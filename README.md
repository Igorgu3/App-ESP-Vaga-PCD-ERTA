# 🚗 Acesso Livre

O **Acesso Livre** é um sistema inteligente desenvolvido para auxiliar no gerenciamento de vagas exclusivas para Pessoas com Deficiência (PCD), integrando um aplicativo mobile, dispositivos embarcados baseados em ESP32 e tecnologias de comunicação sem fio.

A solução utiliza um aplicativo desenvolvido em **Angular + Ionic** para autenticação dos usuários e seleção das vagas, enquanto módulos **ESP32** instalados no estacionamento realizam a comunicação via **Bluetooth Low Energy (BLE)** e controlam o processo de liberação da vaga.

Além do aplicativo mobile, o projeto contempla sensores, sinalização visual e módulos de processamento capazes de futuramente realizar reconhecimento de placas por visão computacional, tornando o sistema mais seguro, acessível e automatizado.

Este projeto foi desenvolvido como parte de um trabalho acadêmico com foco em **Internet das Coisas (IoT)**, **Sistemas Embarcados**, **Desenvolvimento Mobile** e **Acessibilidade**.

---

# 📋 Funcionalidades

## 📱 Aplicativo Mobile

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

## ⚙️ Sistema Embarcado

* Comunicação Bluetooth Low Energy (BLE)
* Detecção da presença de veículos
* Sinalização visual através de LEDs
* Exibição de mensagens em Display OLED
* Estrutura preparada para visão computacional
* Captura de imagens utilizando ESP32-CAM

---

# 🛠️ Tecnologias Utilizadas

## Aplicativo

* Angular
* Ionic Framework
* TypeScript
* HTML5
* SCSS
* Capacitor
* Android Studio
* Leaflet
* Bluetooth Low Energy (BLE)

## Sistemas Embarcados

* ESP32-S
* ESP32-CAM
* HC-SR04
* Display OLED 0.96"
* LEDs
* Resistores
* Protoboard
* Jumpers
* Impressão 3D em PLA

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
Pareamento Bluetooth
        │
        ▼
Confirmação do usuário
        │
        ▼
Envio do comando BLE
        │
        ▼
ESP32 realiza a liberação da vaga
```

---

# 🗺️ Sistema de Mapas

O mapa foi implementado utilizando a biblioteca **Leaflet**, responsável por exibir:

* Localização atual do usuário;
* Vagas monitoradas pelo sistema;
* Seleção da vaga desejada;
* Atualização dinâmica dos marcadores.

---

# 📶 Comunicação Bluetooth

A comunicação entre o aplicativo e o sistema embarcado é realizada utilizando **Bluetooth Low Energy (BLE)**.

Cada ESP32 anuncia continuamente sua presença utilizando um identificador exclusivo associado à vaga em que está instalado.

Após selecionar uma vaga no mapa, o aplicativo:

1. Procura o ESP32 correspondente;
2. Realiza o pareamento Bluetooth;
3. Estabelece a conexão;
4. Aguarda a confirmação do usuário;
5. Envia o comando de liberação.

O firmware do ESP32 interpreta esse comando e realiza o acionamento do sistema responsável pela liberação da vaga.

---

# 🔌 Sistema Embarcado

O sistema embarcado é composto por dois microcontroladores ESP32, responsáveis pela comunicação, processamento e interação com o ambiente.

## ESP32-S

Responsável por:

* Comunicação Bluetooth Low Energy (BLE);
* Pareamento com o aplicativo mobile;
* Leitura do sensor ultrassônico;
* Controle da sinalização luminosa;
* Comunicação com os demais módulos do sistema.

## ESP32-CAM

Responsável por:

* Captura da imagem da placa do veículo;
* Futuras funcionalidades de visão computacional;
* Possível integração com sistemas de validação e fiscalização.

## Sensores e Atuadores

* Sensor Ultrassônico HC-SR04 para detecção da presença de veículos;
* Display OLED para exibição de informações do sistema;
* LEDs vermelho, amarelo e verde para sinalização visual;
* Resistores para divisão de tensão e limitação de corrente;
* Protoboard e Jumpers para montagem do protótipo;
* Sistema de alimentação por pilhas.

Toda a estrutura física foi desenvolvida utilizando impressão 3D em PLA, proporcionando uma montagem organizada e permitindo futuras expansões do projeto.

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
* Navegação simplificada;
* Poucas etapas para liberar uma vaga;
* Componentes responsivos;
* Estrutura preparada para futuras sinalizações sonoras.

---

# 🚀 Trabalhos Futuros

## Aplicativo Mobile

* Banco de dados estruturado;
* Integração com APIs governamentais;
* Validação automática de CPF e credencial PCD;
* Validação da placa do veículo;
* Atualização em tempo real da disponibilidade das vagas;
* Integração com serviços de mapas mais completos.

## Sistemas Embarcados

* Reconhecimento automático de placas;
* Integração com órgãos de fiscalização;
* Sinalização sonora para acessibilidade;
* Estrutura resistente para ambientes externos;
* Servidor local (*Edge Computing*);
* Redução da latência da visão computacional;
* Menor dependência da internet;
* Expansão para múltiplas vagas.

---

# ⚠️ Observações

Este projeto foi desenvolvido para fins acadêmicos.

Algumas funcionalidades foram implementadas apenas como protótipo, incluindo:

* Integração com APIs governamentais;
* Banco de dados definitivo;
* Persistência de usuários;
* Recuperação real de senha;
* Reconhecimento automático de placas;
* Integração com órgãos de fiscalização.

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

Projeto desenvolvido como trabalho acadêmico nas áreas de **Desenvolvimento Mobile**, **Internet das Coisas (IoT)** e **Sistemas Embarcados**, integrando **Angular**, **Ionic**, **ESP32**, **Bluetooth Low Energy (BLE)** e **Visão Computacional** para o desenvolvimento de uma solução inteligente voltada ao gerenciamento de vagas acessíveis.
