### Динамический импорт компонентов

Можно использовать глобальный импорт.

```
import { createApp, defineAsyncComponent } from 'vue'
import type { Component } from 'vue'

type ComponentImport = Record<string, () => Promise<Component>>

/**
 * Register components from a glob import
 * @param components - The components from import.meta.glob
 * @param componentType - The type of component (used for prefix and to remove from filename)
 */
function registerComponents(components: ComponentImport, componentType: string): void {
  for (const [path, component] of Object.entries(components)) {
    const name: string =
      path
        .split('/')
        .pop()!
        .replace(/\.(vue)$/, '')
        .replace(componentType, '') ?? ''

    instance.component(
      `${componentType}${name}`,
      defineAsyncComponent(() => component()),
    )
  }
}

// Import and register components
const iconComponents: ComponentImport = import.meta.glob('@/components/icons/icon*.vue')
registerComponents(iconComponents, 'icon')

const baseComponents: ComponentImport = import.meta.glob('@/components/component*.vue')
registerComponents(baseComponents, 'component')
```
