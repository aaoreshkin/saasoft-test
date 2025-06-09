import { defineStore } from 'pinia'
import { createStorage, type StorageType } from '@/composables/storage'
import type { AccountType, LabelType, RecordType } from '@/types'
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
  const accountData = ref<AccountType[]>(storage.read('accountData') || [])

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
      labelRaw: '',
      label: [],
      type: 'Локальная',
      login: '',
      password: null,
      errors: {},
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

  /**
   * Преобразует строку с метками, разделенными точкой с запятой, в массив объектов меток.
   * Удаляет пробелы по краям каждой метки и игнорирует пустые метки.
   *
   * @param {string} raw - Исходная строка с метками, разделенными точкой с запятой
   * @returns {LabelType[]} Массив объектов меток
   */
  const parseLabel = (raw: string): LabelType[] => {
    return raw.split(';').reduce<LabelType[]>((acc, s) => {
      const text = s.trim()
      if (text) acc.push({ text })
      return acc
    }, [])
  }

  return { accountData, recordOptions, addRecord, removeRecord, saveRecord, parseLabel }
})
