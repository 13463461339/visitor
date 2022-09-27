import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    open: true,
    host: true,
    // 配置代理
    proxy: {
      // 请求的路径前缀只要是 /testaxios 就会被拦截走这个代理
      '/systemport': {
        target: 'http://139.196.5.252',
        ws: true,
        changeOrigin: true,
        // 拦截到的请求路径 testaxios/httphwm/getList，/testaxios会被替换成空
        rewrite: (path) => path.replace(/^\/api/, 'api'),
      },
    }
  }
})
