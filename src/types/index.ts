/**
 * Тип записи аккаунта.
 * Может быть 'Локальная' или 'LDAP'.
 */
export type RecordType = 'Локальная' | 'LDAP'

/**
 * Поля аккаунта, доступные для валидации.
 */
export type AccountField = 'label' | 'login' | 'password' | 'type'

/**
 * Объект ошибок валидации полей аккаунта.
 * Ключи - названия полей, значения - флаги наличия ошибки (true - есть ошибка).
 */
export type AccountErrors = Partial<Record<AccountField, boolean>>

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
   * Исходная строка с метками до обработки.
   */
  labelRaw: string

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

  /**
   * Объект с ошибками валидации полей.
   */
  errors: AccountErrors
}
