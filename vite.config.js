import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json' assert { type: 'json' } // Node >=17

export default defineConfig({
  plugins: [
    vue(),
    crx({ manifest }),
  ],

  server: {
    // 指定dev sever的端口号
    port: 3000,
    // 自动打开浏览器运行以下页面
    open: '/',
  }
})