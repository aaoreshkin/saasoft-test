export interface StorageType {
  /**
   * Читает данные из хранилища по ключу и пытается их распарсить как JSON.
   * Если парсинг не удался, возвращает исходное значение.
   *
   * @template T - Тип возвращаемых данных
   * @param {string} key - Ключ для чтения из хранилища
   * @returns {T | null} Данные из хранилища или null, если данных нет
   */
  read<T = any>(key: string): T | null

  /**
   * Записывает данные в хранилище, преобразуя их в JSON.
   *
   * @template T - Тип записываемых данных
   * @param {string} key - Ключ для записи в хранилище
   * @param {T} value - Значение для записи
   * @returns {boolean} true, если запись успешна, иначе false
   */
  write<T>(key: string, value: T): boolean

  /**
   * Удаляет данные из хранилища по ключу.
   *
   * @param {string} key - Ключ для удаления из хранилища
   * @returns {boolean} true, если удаление успешно, иначе false
   */
  remove(key: string): boolean

  /**
   * Очищает все данные из хранилища.
   *
   * @returns {boolean} true, если очистка успешна, иначе false
   */
  clear(): boolean

  /**
   * Проверяет наличие данных в хранилище по ключу.
   *
   * @param {string} key - Ключ для проверки
   * @returns {boolean} true, если данные существуют, иначе false
   */
  has(key: string): boolean
}
