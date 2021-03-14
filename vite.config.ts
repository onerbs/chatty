import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      'nushi.sass': '../node_modules/@onerbs/nushi/src/nushi.sass',
      'daniela.sass': '../node_modules/@onerbs/daniela/daniela.sass',
      'chatty.sass': '../styles/chatty.sass',
    }
  }
})
