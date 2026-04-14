# Relatório de Arquitetura e Estruturação Frontend - App "Vaga TA"

**Objetivo do Projeto**: Garantir que as vagas exclusivas para PCD (Pessoas com Deficiência) sejam utilizadas estritamente por quem tem o direito legal (credencial). O ecossistema é formado por receptores físicos de sinais, alocados nas vagas físicas, e por este Aplicativo Frontend responsável pelo cadastro, gerenciamento, autenticação do usuário PCD e emissão do sinal local para a liberação da vaga.

---

## 1. Decisões Tecnológicas do Frontend

A fundação do projeto foi desenvolvida utilizando as seguintes tecnologias:
- **Framework Ocupacional**: Ionic Framework (v8.x) - Escolhido pela facilidade e excelente controle num ambiente Cross-Platform (Mobile-first, com compilação web e nativa para iOS/Android mantendo a mesma base de código).
- **Core Lógico/Componentização**: Angular (v18+) - Com o uso de seu moderno roteamento Standalone Component, dispensando NgModules tradicionais para otimizar tempo de carregamento no celular (Lazy Loading dinâmico por rota).
- **Sistema de Mapas**: **Leaflet Maps**, via pacote NPM (`leaflet` e `@types/leaflet`). Essa API open-source foi escolhida por:
  - Isentar projetos acadêmicos e startups de custos associados e cobranças recorrentes que ocorrem em APIs proprietárias (Como Google Maps Platform).
  - Facilidade de centralizar *pins* (marcadores) no mapa de maneira interativa para demonstrar quais estacionamentos contam com o receptor de sinal ativo.

---

## 2. Padrões de Acessibilidade (Prioridade de UX)

Visto o público-alvo (Pessoas com Deficiência e seus acompanhantes), o planejamento de interface garante as seguintes exigências sistêmicas:
1. **Contraste de Interface (WCAG)**: Escolhas de paletas fortes (High-Contrast Mode) e responsividade a modos Escuro e Claro naturais dos Celulares.
2. **Touch Targets (Área de Toque Diferenciada)**: Botões cruciais, como o de "Emitir Sinal / Liberar Vaga" operam muito além do padrão recomendado pelo mercado, priorizando dimensões gigantes ou comportamentos de tela cheia/Cartões inferiores (Bottom Sheets). Isso mitiga falhas de cliques decorrentes de limitações motoras do usuário.
3. **Facilitação Logística de Acesso**: O planejamento engloba simplificações nos campos (apenas Inserção do "Número da Credencial PCD") na etapa do registro, com proposta para futura autenticação biométrica (FaceID/TouchID), cortando assim a necessidade de digitar senhas complexas durante o uso contínuo no dia a dia.

---

## 3. Estruturação do Fluxo de Páginas

Foram geradas e estruturadas as seguintes rotas base conectadas no sistema `src/app/app.routes.ts`:

### 3.1 Módulo de Entrada (Embarque)
* **`/splash`** (Transição Inicial Exclusiva): Tela de apresentação de logotipo (Splash Screen) e boas-vindas oferecendo um fluxo de escolha primária e sem distrações visuais: "Entrar" na conta (Login) ou "Cadastrar nova credencial" (Criar Conta). O roteamento base da aplicação (`/`) bloqueia a entrada direta e agora aponta para a Splash.

### 3.2 Módulo de Autenticação e Registro
* **`/login`**: Processo de autenticação isolado, recebendo E-mail do usuário e Senha, com caminhos abertos para fluxos de esquecimento de senha.
* **`/register`**: Fluxo primário de onboard (cadastro). Registra o usuário PCD preenchendo as chaves: Nome, E-mail, Senha, **Número da Credencial PCD** (usado depois como critério de corte/segurança no backend) e a Placa do Veículo. 
* **`/forgot-password`**: Rota focada apenas em input de resgate / suporte.

### 3.3 Módulo Operacional (Core Features - Uso Diário)
* **`/home`** (O Mapa Central): O coração do app, tela principal acessada assim que o login é efetuado.  Em *background* visual da tela, a biblioteca e mapa do Leaflet será utilizada, indicando o lugar onde o PCD se encontra e mapeando os receptores físicos de rádio-sinal ao redor. Acoplado na parte inferior dessa tela nativa, abrigaremos um menu flutuante trazendo as ações focadas, como o botão mestre para "Enviar Sinal e Liberar Vaga".
* **`/profile`**: Painel administrativo secundário para gerenciamento diário local onde o usuário poderá alterar informações dinâmicas (ex.: trocou de placa do carro e precisa arrumar seus próprios dados), visualizando sua conta conectada de forma clara, ou efetuar "Logout".

---

## 4. Estrutura de Arquivos Criados na Fundação

Durante o andamento desta primeira etapa com o Ionic/Angular CLI, os *scaffoldings* construídos foram (cada qual gerando seus modelos `.ts`, `.html` e `.scss`):
* `src/app/splash/`
* `src/app/login/`
* `src/app/register/`
* `src/app/forgot-password/`
* `src/app/profile/`
* Atualização do *Router* padrão (`app.routes.ts`) refletindo as mudanças lógicas do redirecionamento de `home` para `splash`.
* Instalação concluída no `package.json` para as ferramentas `leaflet` do NPM.
