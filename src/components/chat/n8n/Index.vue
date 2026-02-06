<template>
	<div class="flex h-full flex-col justify-between gap-2">
		<div class="h-full overflow-hidden">
			<div class="h-full overflow-y-auto p-2 pb-0" id="chat-messages-container">
				<h3 v-if="messages.length === 0" class="flex h-full items-center justify-center font-semibold">
					{{ t("helpPrompt") }}
				</h3>
				<div v-else>
					<div v-for="(msg, idx) in messages" :key="idx" class="mb-2">
						<div :class="msg.role === 'user' ? 'text-right' : 'text-left'">
							<div v-if="msg.role === 'user'" class="inline-block max-w-[80%] rounded-xl bg-gray-800 px-3 py-2 text-white" style="font-size: var(--chat-font-size-user, 14px)">
								{{ msg.content }}
							</div>
							<div v-else class="flex items-start gap-2">
								<img :src="consueloAvatar" alt="Consuelo" class="mt-1 size-8 flex-shrink-0 rounded-full" />
								<Renderer class="inline-block max-w-[80%] rounded-xl bg-white px-3 py-2 shadow-sm" :content="msg.content" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="p-2 pt-0">
			<div class="relative mx-auto w-full max-w-[666px] overflow-hidden rounded-xl border bg-white duration-200 hover:border-gray-300 dark:border-zinc-700">
				<!-- chat input -->
				<Textarea @keydown.enter.exact.prevent="sendMessage(userInput)" v-model="userInput" class="h-[36px] resize-none px-3 py-2" :placeholder="isLoading ? t('waiting') : t('askAnything')" :disabled="isLoading" />

				<div class="flex w-full justify-end bg-white p-1 dark:bg-zinc-900">
					<div class="flex items-center gap-2">
						<Thinking v-if="isLoading" class="m-[5px]" />
						<Button class="size-8 rounded-full bg-gray-800 p-0 text-white hover:bg-gray-700" @click="sendMessage(userInput)" :disabled="isLoading">
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
import { useI18n } from "vue-i18n";
import { onMounted, watch, nextTick } from "vue";
import consueloAvatar from "@/assets/consuelo-avatar.png";
import { scrollToLatestMessage } from "@/utils/chat";

const { t } = useI18n();
const { messages, userInput, sendMessage, isLoading, initializeChat } = useN8n();

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
