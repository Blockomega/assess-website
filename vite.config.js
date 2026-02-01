const { defineConfig } = require('vite')
const { resolve } = require('path')

module.exports = defineConfig({
    base: './',
    root: resolve(__dirname, 'src'),
    build: {
        outDir: resolve(__dirname, 'dist'),
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
                login: resolve(__dirname, 'src/login/index.html'),
                register: resolve(__dirname, 'src/register/index.html'),
                dashboard: resolve(__dirname, 'src/dashboard/index.html')
            }
        }
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