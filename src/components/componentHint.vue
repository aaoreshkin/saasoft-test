<script setup lang="ts">
import { icons } from '@/components'

const { iconQuestionCircle } = icons
</script>

<template>
  <div>
    <icon-question-circle />

    <p>
      Для указания нескольких меток для одной пары логин/пароль используйте разделитель
      <code>;</code>
    </p>
  </div>
</template>

<style scoped lang="scss">
div {
  background-color: #eee;
  display: flex;
  gap: 10px;
  padding: 20px;
  place-items: center;
}
</style>
