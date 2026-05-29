import { defineConfig } from "tsup";
import { buildStyles } from "./src/build-styles";

export default defineConfig({
	entry: ["src/index.ts"],
	format: ["esm"],
	dts: true,
	sourcemap: true,
	clean: true,
	external: ["react", "react-dom"],
	// tsup clean wipes dist/styles; rebuild CSS after every JS build (including --watch).
	async onSuccess() {
		await buildStyles();
	},
});
