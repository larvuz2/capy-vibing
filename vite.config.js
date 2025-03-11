import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';

export default {
    base: './',
    server: {
        port: 3000
    },
    plugins: [
        wasm(),
        topLevelAwait()
    ],
    build: {
        target: 'esnext'
    }
} 