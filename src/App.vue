<template>
	<div>
		<N8nEmbeddedChatInterface label="Consuelo - Agente Virtual" description="Assistente virtual do Procon" :hostname="testUrl" mode="n8n" open-on-start="true" initial-message="Como posso te ajudar? 😊" />
	</div>
</template>
<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useDark, useToggle } from "@vueuse/core";
import N8nEmbeddedChatInterface from "./components/N8nEmbeddedChatInterface.vue";

const testUrl = ref(import.meta.env.VITE_N8N_TEST_WEBHOOK_URL ?? "");

// Use vue-i18n composable
const { locale } = useI18n();
const isDark = useDark();
const toggleDark = useToggle(isDark);
// Function to change language
function setLocale(lang) {
	locale.value = lang;
}
</script>
