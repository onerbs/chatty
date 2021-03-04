import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      'nushi.css': '../node_modules/@onerbs/nushi/dist/nushi.min.css',
      'daniela.css': '../node_modules/@onerbs/daniela/dist/daniela.min.css',
      'chatty.css': '../styles/chatty.min.css',
    }
  }
})
