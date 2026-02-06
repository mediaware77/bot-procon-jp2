<template>
	<div class="fixed bottom-4 right-4 size-[72px] cursor-pointer" @click="show = !show">
		<img v-if="!show" :src="consueloAvatar" alt="Consuelo" class="size-[72px] rounded-full shadow-lg transition-transform hover:scale-110" />
		<div v-else class="flex size-[72px] items-center justify-center rounded-full bg-primary">
			<Close class="size-9 text-white" />
		</div>
	</div>

	<div v-if="show" :class="[isMaximized ? 'inset-0' : 'shadow-main-ui bottom-24 right-4 h-[450px] w-[320px] rounded-2xl', 'fixed flex flex-col overflow-hidden bg-gray-50']">
		<div class="flex items-center justify-between border-b border-gray-200 bg-white/80 p-2">
			<div class="flex items-center gap-2">
				<div>
					<h1 class="text-sm font-bold text-[#374151]">{{ appConfig.label }}</h1>
					<p v-if="protocolNumber" class="text-[11px] text-gray-500">Protocolo {{ protocolNumber }}</p>
				</div>
			</div>
			<div class="flex items-center">
				<button class="flex size-7 cursor-pointer items-center justify-center rounded-md text-gray-600 hover:bg-gray-100" @click="isMaximized = !isMaximized">
					<Maximize v-if="!isMaximized" />
					<ShrinkIcon v-else />
				</button>
			</div>
		</div>
		<div class="flex-1 overflow-auto">
			<!-- Render content based on mode prop -->
			<template v-if="appConfig.mode === 'n8n'">
				<ChatN8n />
			</template>
		</div>
	</div>
	<!-- toaster -->
	<Toaster />
</template>

<script setup lang="ts">
import Toaster from "@/components/ui/toast/Toaster.vue";
import Maximize from "~icons/flowbite/expand-outline";
import Question from "~icons/proicons/question";
import Close from "~icons/material-symbols/close-rounded";
import ShrinkIcon from "~icons/lucide/shrink";

import ChatN8n from "@/components/chat/n8n/Index.vue";
import consueloAvatar from "@/assets/consuelo-avatar.png";

import { useDark, useToggle } from "@vueuse/core";
import { useApp } from "@/stores/App";
import { useN8n } from "@/stores/n8n";
import { onBeforeMount } from "vue";

// import SunIcon from "~icons/mdi/weather-sunny";
// import MoonIcon from "~icons/mdi/weather-night";
// import SettingsIcon from "~icons/ic/round-settings";

const { isMaximized, show, appConfig } = useApp();
const { protocolNumber } = useN8n();

const props = defineProps({ 
	label: String, 
	description: String, 
	token: String, 
	organisationId: String, 
	assistant: String, 
	hostname: String, 
	mode: String, 
	openOnStart: String,
	initialMessage: String,
	// Custom color scheme props (max 10 colors)
	primaryColor: String,
	secondaryColor: String,
	backgroundColor: String,
	textColor: String,
	accentColor: String,
	surfaceColor: String,
	borderColor: String,
	successColor: String,
	warningColor: String,
	errorColor: String
});

const isDark = useDark();
const toggleDark = useToggle(isDark);

type Mode = "n8n"; // to be extended later

const parseMode = (input?: string): Mode => {
	console.log("input", input);
	if (input && input === "n8n") {
		return input;
	} else {
		return "n8n";
	}
};
const parsedMode = parseMode(props.mode);

onBeforeMount(() => {
	show.value = props.openOnStart === "true";
	appConfig.value = {
		label: props.label ?? "",
		description: props.description ?? "",
		hostname: props.hostname ?? "",
		mode: parsedMode,
		initialMessage: props.initialMessage ?? "",
	};
	console.log("appConfig", JSON.stringify(appConfig.value, null, 2));
});
</script>
