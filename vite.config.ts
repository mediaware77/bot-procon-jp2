import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import replace from "@rollup/plugin-replace";
import path from "path";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import Icons from "unplugin-icons/vite";
import vueDevTools from "vite-plugin-vue-devtools";

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");

	return {
		plugins: [
			{
				name: 'serve-chatbot-js',
				configureServer(server) {
					server.middlewares.use((req, _res, next) => {
						if (req.url === '/chatbot.js') {
							req.url = '/src/prod.ts';
						}
						next();
					});
				},
			},
			vue(),
			vueDevTools(),
			replace({
				preventAssignment: true,
				"process.env.NODE_ENV": JSON.stringify("production"),
			}),
			Components({
				dts: "src/components.d.ts",
				directoryAsNamespace: true, // Prefix folder names to components
			}),
			AutoImport({
				dts: "src/auto-imports.d.ts",
				imports: ["vue", "vue-router", "vue-i18n", "@vueuse/core"],
				dirs: ["./src/stores", "./src/utils", "./src/composables", "./src/icons"],
			}),
			Icons({}),
		],
		build: {
			outDir: "output",
			emptyOutDir: false,
			cssCodeSplit: false,
		},
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
				"@components": path.resolve(__dirname, "./src/components"),
			},
		},
		server: {
			host: true, // Listen on all addresses including IPv4
			hmr: {
				overlay: false, // Disable the HMR overlay
			},
			proxy: {
				'/api': {
					target: 'https://n8n-lab.bravonix.ai',
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, ''),
					secure: true,
				},
			},
		},
	};
});
