###

Можно использовать класс для работы с хранилищем

```ts
export class StorageService {
  private storage: Storage

  constructor(storageType: 'session' | 'local' = 'session') {
    this.storage = storageType === 'session' ? sessionStorage : localStorage
  }

  read<T = any>(key: string): T | string | null {
    const payload = this.storage.getItem(key)

    if (payload === null) {
      return null
    }

    try {
      return JSON.parse(payload) as T
    } catch (e) {
      return payload
    }
  }

  write<T>(key: string, value: T): boolean {
    try {
      this.storage.setItem(key, JSON.stringify(value))
      return true
    } catch (e) {
      return false
    }
  }

  remove(key: string): boolean {
    try {
      this.storage.removeItem(key)
      return true
    } catch (e) {
      return false
    }
  }
}

const session = new StorageService('session')
const local = new StorageService('local')

export { session, local }
```

Ну или декларативный подход c жесткой привязкой к хранилищу

```ts
export const read = <T = any>(key: string): T | string | null => {
  const payload = sessionStorage.getItem(key)

  if (payload === null) {
    return null
  }

  try {
    return JSON.parse(payload) as T
  } catch (e) {
    return payload
  }
}

export const write = <T>(key: string, value: T): boolean => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (e) {
    return false
  }
}

export const remove = (key: string): boolean => {
  try {
    sessionStorage.removeItem(key)
    return true
  } catch (e) {
    return false
  }
}

export const clear = (): boolean => {
  try {
    sessionStorage.clear()
    return true
  } catch (e) {
    return false
  }
}

export const has = (key: string): boolean => {
  return sessionStorage.getItem(key) !== null
}
```
