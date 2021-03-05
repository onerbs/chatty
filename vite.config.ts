import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      'nushi.scss': '../node_modules/@onerbs/nushi/src/nushi.scss',
      'daniela.css': '../node_modules/daniela/dist/daniela.min.css',
      'chatty.scss': '../styles/chatty.scss',
    }
  }
})
