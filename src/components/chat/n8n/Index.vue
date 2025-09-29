<template>
	<div class="flex h-full flex-col">
		<div class="flex-1 overflow-hidden">
			<div class="h-full overflow-y-auto p-2 pb-0" id="chat-messages-container">
				<h3 v-if="messages.length === 0" class="flex h-full items-center justify-center font-semibold">
					{{ t("helpPrompt") }}
				</h3>
				<div v-else>
					<div v-for="(msg, idx) in messages" :key="idx" class="mb-2">
						<div :class="msg.role === 'user' ? 'text-right' : 'text-left'">
							<div v-if="msg.role === 'user'" class="inline-block max-w-[80%] rounded bg-primary px-3 py-2 text-white relative" style="font-size: var(--chat-font-size-user, 14px)">
								{{ msg.content }}
								<span v-if="msg.status === 'pending'" class="absolute -bottom-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border-2 border-white" title="Pendente"></span>
								<span v-else-if="msg.status === 'processing'" class="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-400 rounded-full border-2 border-white animate-pulse" title="Processando"></span>
								<span v-else-if="msg.status === 'error'" class="absolute -bottom-1 -right-1 w-3 h-3 bg-red-400 rounded-full border-2 border-white" title="Erro"></span>
							</div>
							<Renderer class="inline-block max-w-[80%] rounded bg-gray-200 px-3 py-2 dark:bg-zinc-800" v-else :content="msg.content" />
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="flex-shrink-0 p-2 pt-0">
			<div :class="{ '!border-primary': focused }" class="relative mx-auto w-full max-w-[666px] overflow-hidden rounded-md border duration-200 hover:border-primary/40 dark:border-zinc-700">
				<!-- chat input -->
				<Textarea @keydown.enter.exact.prevent="sendMessage(userInput)" v-model="userInput" :class="focused ? 'h-[84px]' : 'h-[32px]'" class="mb-2 resize-none transition-all duration-200" @blur="focused = false" :placeholder="t('askAnything')" @click="focused = true" />

				<div class="flex w-full justify-between bg-white p-1 dark:bg-zinc-900">
					<!-- options (nur Reset) -->
					<div class="flex items-center gap-1">
						<Button class="size-8 rounded-full border p-0 text-neutral-600 hover:bg-neutral-200" variant="secondary" @click="clearChat">
							<FluentErase24Regular class="text-lg" />
						</Button>
						<span v-if="messageQueue.length > 0" class="text-xs text-gray-500">
							{{ messageQueue.length }} na fila
						</span>
					</div>
					<div class="flex items-center gap-2">
						<Thinking v-if="isProcessingQueue" class="m-[5px]" />
						<Button class="size-8 rounded-full p-0" @click="sendMessage(userInput)">
							<PaperPlaneIcon class="text-lg" />
						</Button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import PaperPlaneIcon from "~icons/fluent/send-24-regular";
import Thinking from "@/components/Thinking.vue";
import { useN8n } from "@/stores/n8n";
import Renderer from "@/components/markdown/Renderer.vue";
import FluentErase24Regular from "~icons/fluent/eraser-24-regular";
import { useI18n } from "vue-i18n";
import { onMounted, watch, nextTick } from "vue";
import { scrollToLatestMessage } from "@/utils/chat";

const { t } = useI18n();
const { messages, userInput, sendMessage, isLoading, clearChat, initializeChat, messageQueue, isProcessingQueue } = useN8n();
const focused = ref(false);

onMounted(() => {
	initializeChat();
});

// Auto-scroll to bottom when messages change
watch(messages, async () => {
	await nextTick();
	const container = document.getElementById("chat-messages-container");
	if (container) {
		container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
	}
}, { deep: true });
</script>
