import type { StorageType } from './types'

/**
 * Создает интерфейс для работы с хранилищем.
 *
 * @param {Storage} storage - Объект хранилища (localStorage, sessionStorage)
 * @returns {StorageType} Объект с методами для работы с хранилищем
 */
export const createStorage = (storage: Storage): StorageType => ({
  read<T = any>(key: string): T | null {
    const payload = storage.getItem(key)
    if (payload === null) return null
    try {
      return JSON.parse(payload) as T
    } catch {
      return payload as unknown as T
    }
  },
  write<T>(key: string, value: T): boolean {
    try {
      storage.setItem(key, JSON.stringify(value))
      return true
    } catch {
      return false
    }
  },
  remove(key: string): boolean {
    try {
      storage.removeItem(key)
      return true
    } catch {
      return false
    }
  },
  clear(): boolean {
    try {
      storage.clear()
      return true
    } catch {
      return false
    }
  },
  has(key: string): boolean {
    return storage.getItem(key) !== null
  },
})

export type { StorageType }
