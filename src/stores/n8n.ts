import { createGlobalState } from "@vueuse/core";
import { useToast } from "@/components/ui/toast/use-toast";
import type { N8nMessageResponse } from "@/types/chat";
import { useApp } from "@/stores/App";
import { ref } from "vue";

export const useN8n = createGlobalState(() => {
	const { appConfig } = useApp();
	const { toast } = useToast();

	const messages = ref<{ role: "user" | "assistant"; content: string; status?: "pending" | "processing" | "completed" | "error" }[]>([]);
	const userInput = ref("");
	const isLoading = ref(false);
	const sessionId = ref<string | null>(null);
	const messageQueue = ref<string[]>([]);
	const isProcessingQueue = ref(false);

	const addMessageToQueue = (chatInput: string) => {
		if (chatInput.trim() === "") {
			userInput.value = "";
			toast({ title: "Please enter a message" });
			return;
		}

		messageQueue.value.push(chatInput);
		messages.value.push({ role: "user", content: chatInput, status: "pending" });
		userInput.value = "";

		if (!isProcessingQueue.value) {
			processQueue();
		}
	};

	const processQueue = async () => {
		if (isProcessingQueue.value || messageQueue.value.length === 0) return;

		isProcessingQueue.value = true;
		isLoading.value = true;

		while (messageQueue.value.length > 0) {
			const chatInput = messageQueue.value.shift()!;
			const userMessageIndex = messages.value.findIndex(
				msg => msg.role === "user" && msg.content === chatInput && msg.status === "pending"
			);

			if (userMessageIndex !== -1) {
				messages.value[userMessageIndex].status = "processing";
				messages.value.push({ role: "assistant", content: "Pensando...", status: "processing" });

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

					messages.value[userMessageIndex].status = "completed";
					messages.value[messages.value.length - 1] = { role: "assistant", content: answer, status: "completed" };
				} catch (error) {
					messages.value[userMessageIndex].status = "error";
					messages.value[messages.value.length - 1] = { role: "assistant", content: "Erro: " + (error as any).message, status: "error" };
					toast({ title: "Ocorreu um erro. Tente mais tarde", variant: "destructive" });
				}
			}
		}

		isProcessingQueue.value = false;
		isLoading.value = false;
	};

	const sendMessage = addMessageToQueue;

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
		messageQueue.value = [];
		isProcessingQueue.value = false;
		initializeChat();
	};

	return { messages, userInput, sendMessage, isLoading, clearChat, initializeChat, messageQueue, isProcessingQueue };
});
