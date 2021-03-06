import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      'nushi.sass': '../node_modules/@onerbs/nushi/src/nushi.sass',
      'daniela.scss': '../node_modules/@onerbs/daniela/styles.scss',
      'chatty.sass': '../styles/chatty.sass',
    }
  }
})
