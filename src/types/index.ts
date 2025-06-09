/**
 * Тип записи аккаунта.
 * Может быть 'Локальная' или 'LDAP'.
 */
export type RecordType = 'Локальная' | 'LDAP'

/**
 * Интерфейс для метки аккаунта.
 */
export interface LabelType {
  /**
   * Текстовое содержимое метки.
   */
  text: string
}

/**
 * Интерфейс для объекта аккаунта.
 */
export interface AccountType {
  /**
   * Обработанный массив меток.
   */
  label: LabelType[]

  /**
   * Тип записи аккаунта.
   */
  type: RecordType

  /**
   * Логин пользователя.
   */
  login: string

  /**
   * Пароль пользователя. Null для LDAP-аккаунтов.
   */
  password: string | null
}
