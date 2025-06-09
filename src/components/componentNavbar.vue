<script setup lang="ts">
import { icons } from '@/components'

const { iconPlus } = icons
</script>

<template>
  <nav>
    <h3>Учетные записи</h3>

    <button type="button" v-on:click="$emit('add')">
      <icon-plus />
    </button>
  </nav>
</template>

<style scoped lang="scss">
nav {
  display: flex;
  gap: 10px;
  place-items: center;

  button {
    border: 1px solid;
    padding: 10px;
  }
}
</style>
