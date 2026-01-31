import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    base: './', // oder '/repo-name/' für GitHub Pages
    root: resolve(__dirname, 'src'),
    build: {
        outDir: '../dist'
    },
    server: {
        port: 8080
    },
    css: {
        preprocessorOptions: {
            scss: {
                silenceDeprecations: [
                    'import',
                    'mixed-decls',
                    'color-functions',
                    'global-builtin',
                ],
            },
        },
    },
})
