# Registro de Melhorias e Ajustes

Documento que registra todas as melhorias, correções e ajustes realizados no projeto.

---

## [2026-02-06 01:53] Aumentar botão, janela responsiva e fontes do chatbot — `8f300d8`

**Arquivos alterados:** `src/components/N8nEmbeddedChatInterface.vue`, `src/components/ui/textarea/Textarea.vue`, `src/utils/config.ts`

**Descrição:** Botão flutuante da Consuelo aumentado de 72px para 91px. Botão de fechar substituído por texto "FECHAR X". Janela do chatbot agora tem tamanhos responsivos por breakpoint: mobile 320×450, tablet 400×550, desktop 450×600. Fontes do cabeçalho (text-base), mensagens do bot (15px), headers do bot (18px), mensagens do usuário (16px) e caixa de texto (text-base) foram aumentadas para melhor legibilidade.

---

## [2026-02-06 02:06] Link para abrir chatbot em tela cheia — `aac45e4`

**Arquivos alterados:** `src/components/N8nEmbeddedChatInterface.vue`, `src/prod.ts`

**Descrição:** Adicionada funcionalidade para abrir o chatbot diretamente em tela cheia de duas formas: (1) prop `open-fullscreen="true"` para páginas dedicadas ao chat, que abre em fullscreen sem botão flutuante; (2) função global `window.openChatFullscreen()` para links em páginas que já têm o widget embarcado, permitindo uso via `<a onclick="openChatFullscreen()">`. O método `openFullscreen()` também está disponível diretamente no custom element.

---

## [2026-02-06] Remover botão limpar conversa e fixar input em 1 linha

**Arquivos alterados:** `src/components/chat/n8n/Index.vue`

**Descrição:** Removido o botão de limpar conversa (ícone de borracha) da barra inferior do chat. Campo de digitação alterado para altura fixa de 1 linha, sem expansão ao focar. Removidos imports e variáveis não utilizados (`FluentErase24Regular`, `clearChat`, `focused`).

---

## [2026-02-06 01:13] Label "Iniciar conversa" com hover — `bec0a52`

**Arquivos alterados:** `src/components/N8nEmbeddedChatInterface.vue`, `src/App.vue`

**Descrição:** Label "Iniciar conversa" adicionada ao botão flutuante do chatbot, oculta por padrão e visível ao passar o mouse sobre o avatar. Implementado com CSS scoped (`.floating-btn:hover .floating-label`) ao invés de Tailwind `group-hover`, que não estava disponível no CSS pré-compilado do Shadow DOM. Também ajustado `open-on-start` para `false` no App.vue.

---

## [2026-02-06] Neutralizar cores do widget chatbot

**Arquivos alterados:** `src/components/N8nEmbeddedChatInterface.vue`, `src/components/chat/n8n/Index.vue`, `src/styles/input.css`

**Descrição:** Substituída toda a paleta de cores vibrantes (roxo #7C3AED, lavanda #F5F0FF, verde menta #86EFAC, vermelho) por uma paleta neutra de cinzas. O widget agora usa fundo gray-50, bolhas do usuário em gray-800, botão enviar em gray-800, scrollbar em gray-400/500, e demais elementos em tons de cinza. Isso garante que o chatbot combine com qualquer esquema de cores do site onde for embarcado. Também removido o avatar do header e a borda esquerda colorida.

---

## [2026-02-06] Redesign visual do widget chatbot

**Arquivos alterados:** `src/components/N8nEmbeddedChatInterface.vue`, `src/components/chat/n8n/Index.vue`, `src/i18n.ts`, `src/styles/input.css`

**Descrição:** Redesign completo do visual do chatbot com esquema lavanda/roxo. Container com fundo lavanda (#F5F0FF), bordas arredondadas 16px e borda esquerda verde menta (#86EFAC). Header claro (branco/lavanda) com avatar, nome em negrito e protocolo em roxo. Bolhas do bot com fundo branco e sombra sutil, bolhas do usuário em roxo (#7C3AED). Input com cantos arredondados, placeholder "Digite sua pergunta..." e botão enviar vermelho. Botão limpar e maximize em roxo. Scrollbar em roxo.

---

## [2026-02-05] Ajustar botão flutuante e remover avatar do header

**Arquivo alterado:** `src/components/N8nEmbeddedChatInterface.vue`

**Descrição:** Aumentado o tamanho do botão flutuante da Consuelo de 56px para 72px e removido o avatar duplicado do header do chat, mantendo apenas o nome.

---

## [2026-02-05] Substituir botão de abrir chat pelo avatar da Consuelo

**Arquivo alterado:** `src/components/N8nEmbeddedChatInterface.vue`

**Descrição:** O botão flutuante que abria o chatbot (círculo com ícone de interrogação) foi substituído pela imagem da Consuelo, tornando o ponto de entrada do chat mais visual e alinhado com a identidade do agente virtual.

---

## [2026-02-05] Adicionar avatar da Consuelo ao chatbot

**Arquivos alterados:** `src/components/chat/n8n/Index.vue`, `src/components/N8nEmbeddedChatInterface.vue`, `src/assets/consuelo-avatar.png`

**Descrição:** Adicionada a imagem `consuelo2-small.png` (150x145px, 35KB) como avatar da Consuelo. O avatar aparece no header do chat ao lado do nome e também ao lado de cada mensagem enviada pelo bot, melhorando a identidade visual do agente virtual.

---

## [2026-02-05] Renomear chatbot para "Consuelo - Agente Virtual"

**Arquivo alterado:** `src/App.vue`

**Descrição:** O label do chatbot foi alterado de `"Agente Virtual do Procon"` para `"Consuelo - Agente Virtual"`, refletindo a nova identidade do agente virtual.
