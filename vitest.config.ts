import vue from '@vitejs/plugin-vue'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import { fileURLToPath } from 'node:url'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [vue()],
    test: {
      globals: true,
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      coverage: {
        enabled: true
      }
    }
  })
)
