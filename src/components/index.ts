import { defineAsyncComponent } from 'vue'
import { icons } from './icons'

const modules: Record<string, () => Promise<any>> = import.meta.glob('./*.vue')

const el: { [key: string]: any } = {}

for (const path in modules) {
  const name = path.replace(/^\.\//, '').replace(/\.\w+$/, '')

  el[name] = defineAsyncComponent(() => modules[path]().then((module: any) => module.default))
}

export { el as components, icons }
