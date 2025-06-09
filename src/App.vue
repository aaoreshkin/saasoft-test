<script setup lang="ts">
import { components, icons } from '@/components'
import { useStore } from './provider'
import type { AccountType, RecordType } from './types'
import { computed, ref, type ComputedRef, type Ref } from 'vue'

// Деструктуризация компонентов и иконок
const { componentNavbar, componentHint } = components
const { iconTrash, iconEyeSlash } = icons

const store = useStore()

/**
 * Реактивная ссылка на данные аккаунтов из хранилища.
 * @type {ComputedRef<AccountType[]>}
 */
const accountData: ComputedRef<AccountType[]> = computed(() => store.accountData)

/**
 * Реактивная ссылка на доступные типы записей из хранилища.
 * @type {ComputedRef<RecordType[]>}
 */
const recordOptions: ComputedRef<RecordType[]> = computed(() => store.recordOptions)

/**
 * Добавляет новую запись аккаунта через хранилище.
 * @returns {void}
 */
const addRecord = (): void => store.addRecord()

/**
 * Удаляет запись аккаунта по указанному индексу через хранилище.
 * @param {number} index - Индекс удаляемой записи
 * @returns {void}
 */
const removeRecord = (index: number): void => store.removeRecord(index)

/**
 * Сохраняет текущее состояние данных аккаунтов в хранилище.
 * @returns {void}
 */
const saveRecord = (): void => store.saveRecord()

/**
 * Обрабатывает изменение типа записи аккаунта.
 * Устанавливает новый тип и обновляет поле пароля в зависимости от типа.
 * Для LDAP устанавливает пароль в null, для других типов - пустую строку.
 * После изменения запускает валидацию полей login и password.
 *
 * @param {number} index - Индекс аккаунта в массиве accountData
 * @param {RecordType} type - Новый тип записи
 * @returns {void}
 */
const handleTypeChange = (index: number, type: RecordType): void => {
  const account = accountData.value[index]
  account.type = type

  if (type === 'LDAP') {
    account.password = null
  } else {
    account.password = ''
  }
}

/**
 * Реактивный массив для хранения состояний видимости паролей.
 * @type {Ref<boolean[]>}
 */
const passwordVisibility: Ref<boolean[]> = ref<boolean[]>([])

/**
 * Переключает видимость пароля для аккаунта с указанным индексом.
 * @param {number} index - Индекс аккаунта в массиве
 * @returns {void}
 */
const togglePasswordVisibility = (index: number): void => {
  passwordVisibility.value[index] = !passwordVisibility.value[index]
}
</script>

<template>
  <main>
    <header>
      <component-navbar v-on:add="addRecord()" />
      <component-hint />
    </header>

    <pre>
        {{ accountData }}
    </pre>

    <section>
      <table>
        <thead>
          <tr>
            <th>Метки</th>
            <th>Тип записи</th>
            <th>Логин</th>
            <th>Пароль</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-if="accountData.length === 0">
            <td colspan="5">Нет записей</td>
          </tr>

          <tr v-for="(account, index) in accountData" v-bind:key="index">
            <td>
              <input type="text" v-model="account.label" />
            </td>

            <td>
              <select v-model="account.type" v-on:change="handleTypeChange(index, account.type)">
                <option v-for="option in recordOptions" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
            </td>

            <td v-bind:colspan="account.type === 'LDAP' ? 2 : 1">
              <input type="text" v-model="account.login" />
            </td>

            <td v-if="account.type !== 'LDAP'">
              <input
                v-bind:type="passwordVisibility[index] ? 'text' : 'password'"
                v-model="account.password"
              />
              <icon-eye-slash v-on:click="togglePasswordVisibility(index)" />
            </td>

            <td>
              <button type="button" v-on:click="removeRecord(index)">
                <icon-trash />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: system-ui, sans-serif;
}

main {
  margin: auto;
  max-width: 1240px;
  padding: 20px;
}

section {
  margin-top: 20px;
}

header {
  display: grid;
  gap: 20px;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: normal;
  margin: 0;
}

input,
select {
  background: unset;
  border: 1px solid;
  font: inherit;
  padding: 10px;
  width: 100%;
}

button {
  background-color: unset;
  border: unset;
  cursor: pointer;

  &:has(svg) {
    line-height: 0;
  }
}

table {
  border-spacing: 10px;
  width: 100%;

  thead {
    margin-bottom: 10px;

    tr {
      th {
        opacity: 0.6;
      }
    }
  }

  tr {
    text-align: left;

    th,
    td {
      font-weight: normal;
    }
    td {
      position: relative;

      &:not(:last-child) {
        svg {
          cursor: pointer;
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
}
</style>
