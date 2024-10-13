import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Adjust this to your backend server's URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
});
