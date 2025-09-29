import { createGlobalState } from "@vueuse/core";
import { useToast } from "@/components/ui/toast/use-toast";
import type { N8nMessageResponse } from "@/types/chat";
import { useApp } from "@/stores/App";
import { ref } from "vue";

export const useN8n = createGlobalState(() => {
	const { appConfig } = useApp();
	const { toast } = useToast();

	const messages = ref<{ role: "user" | "assistant"; content: string }[]>([]);
	const userInput = ref("");
	const isLoading = ref(false);
	const sessionId = ref<string | null>(null);

	const sendMessage = async (chatInput: string) => {
		if (chatInput.trim() === "") {
			userInput.value = "";
			toast({ title: "Please enter a message" });
			return;
		}

		if (isLoading.value) {
			toast({ title: "Aguarde a resposta da mensagem anterior" });
			return;
		}

		isLoading.value = true;
		messages.value.push({ role: "user", content: chatInput });
		userInput.value = "";

		try {
			const body: Record<string, any> = { chatInput };
			if (sessionId.value) body.sessionId = sessionId.value;

			const response = await fetch(appConfig.value.hostname, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});
			if (!response.ok) throw new Error(await response.text());
			const rawData = await response.json();

			const data = Array.isArray(rawData) ? rawData[0] : rawData;
			const answer = typeof data === "string" ? data : data.output;
			if (data.sessionId) sessionId.value = data.sessionId;

			messages.value.push({ role: "assistant", content: answer });
		} catch (error) {
			messages.value.push({ role: "assistant", content: "Erro: " + (error as any).message });
			toast({ title: "Ocorreu um erro. Tente mais tarde", variant: "destructive" });
		} finally {
			isLoading.value = false;
		}
	};

	const initializeChat = () => {
		if (appConfig.value.initialMessage && appConfig.value.initialMessage.trim() !== "") {
			messages.value = [{ role: "assistant", content: appConfig.value.initialMessage }];
		} else {
			messages.value = [];
		}
	};

	const clearChat = () => {
		userInput.value = "";
		isLoading.value = false;
		sessionId.value = null;
		initializeChat();
	};

	return { messages, userInput, sendMessage, isLoading, clearChat, initializeChat };
});
