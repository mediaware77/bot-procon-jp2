# Registro de Melhorias e Ajustes

Documento que registra todas as melhorias, correções e ajustes realizados no projeto.

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
