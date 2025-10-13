// i18n.ts - vue-i18n setup for English and German
import { createI18n } from "vue-i18n";

// English and German translations
const messages = {
	en: {
		uploadingArtifacts: "Uploading artifacts",
		thinking: "Pensando...",
		helpPrompt: "What can I help with?",
		askAnything: "pode começar a digitar...",
		waiting: "⏳",
	},
	de: {
		uploadingArtifacts: "Lade Anhänge hoch",
		thinking: "Pensando...",
		helpPrompt: "Womit kann ich helfen?",
		askAnything: "pode começar a digitar...",
		waiting: "⏳",
	},
};

const i18n = createI18n({
	legacy: false, // Use Composition API
	locale: "en", // Default language
	fallbackLocale: "en",
	messages,
});

export default i18n;
