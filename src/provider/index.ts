import { defineStore } from 'pinia'
import { createStorage, type StorageType } from '@/composables/storage'
import type { AccountType, RecordType } from '@/types'
import { ref } from 'vue'

/**
 * Хранилище данных, созданное на основе sessionStorage.
 * Используется для сохранения и загрузки данных аккаунтов между сессиями.
 *
 * @type {StorageType}
 */
const storage: StorageType = createStorage(sessionStorage)

export const useStore = defineStore('app', () => {
  /**
   * Массив данных аккаунтов, загружаемый из хранилища.
   * Инициализируется пустым массивом, если данные не найдены.
   * Используется для хранения информации о каждом аккаунте.
   */
  const accountData = ref<AccountType[]>([])

  /**
   * Массив доступных типов записей аккаунта.
   * Используется для выбора типа записи при добавлении нового аккаунта.
   */
  const recordOptions = ref<RecordType[]>(['Локальная', 'LDAP'])

  /**
   * Добавляет новую запись аккаунта в массив данных.
   * Создает запись с пустыми значениями полей и типом 'Локальная' по умолчанию.
   *
   * @returns {void}
   */
  const addRecord = (): void => {
    accountData.value.push({
      label: [],
      type: 'Локальная',
      login: '',
      password: null,
    })
  }

  /**
   * Удаляет запись аккаунта по указанному индексу из массива данных.
   * После удаления сохраняет обновленные данные в хранилище.
   *
   * @param {number} index - Индекс удаляемой записи в массиве accountData
   * @returns {void}
   */
  const removeRecord = (index: number): void => {
    accountData.value.splice(index, 1)

    saveRecord()
  }

  /**
   * Сохраняет текущее состояние данных аккаунтов в хранилище.
   * Использует метод write из объекта storage для записи данных с ключом 'accountData'.
   *
   * @returns {void}
   */
  const saveRecord = (): void => {
    storage.write('accountData', accountData.value)
  }

  return { accountData, recordOptions, addRecord, removeRecord, saveRecord }
})
