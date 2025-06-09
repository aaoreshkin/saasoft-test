<script setup lang="ts">
import { components, icons } from '@/components'

// Деструктуризация компонентов и иконок
const { componentNavbar, componentHint } = components
const { iconTrash, iconEyeSlash } = icons
</script>

<template>
  <main>
    <header>
      <component-navbar />
      <component-hint />
    </header>

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
          <tr>
            <td>
              <input type="text" />
            </td>

            <td>
              <select>
                <option>Локальная</option>
                <option>LDAP</option>
              </select>
            </td>

            <td>
              <input type="text" />
            </td>

            <td>
              <input type="password" />
              <icon-eye-slash />
            </td>

            <td>
              <button type="button">
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
