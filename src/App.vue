<script setup lang="ts">
import { components } from '@/components'

// Деструктуризация компонентов
const { componentNavbar, componentHint } = components
</script>

<template>
  <main>
    <header>
      <component-navbar />
      <component-hint />
    </header>
  </main>
</template>

<style lang="scss">
// & else
</style>
