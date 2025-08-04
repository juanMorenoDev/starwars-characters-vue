import type { App } from 'vue'
import { createApp } from 'vue'

export function withSetup<T>(composable: () => T): [T, App] {
  let result: T | null = null
  const app = createApp({
    setup() {
      result = composable()
      return () => {}
    },
  })
  app.mount(document.createElement('div'))
  if (result === null) {
    throw new Error('Composable did not return a value')
  }
  return [result, app]
}
