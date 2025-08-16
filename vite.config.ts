import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src') // 配置 @ 指向 src 目录
    },
    extensions: [
      '.js',    // 默认已包含
      '.jsx',   // 默认已包含
      '.mjs',
      '.ts',
      '.tsx',
      '.json'
    ]
  },
  server: {
    proxy: {
      // 基本代理示例
      '/api': {
        target: 'http://localhost:8080', // 后端服务器地址
        changeOrigin: true, // 修改请求头中的 Origin 为目标地址
        rewrite: (path) => path.replace(/^\/api/, '') // 移除路径中的 /api 前缀
      }
    }
  }
})
