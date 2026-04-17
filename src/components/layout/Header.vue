<template>
  <header class="header">
    <router-link to="/devices">Устройства</router-link>
    <router-link to="/devices/create">Добавить устройство</router-link>
  </header>
</template>

<style lang="scss" scoped>
.header {
  background: $bg-primary;
  font-weight: bold;
  padding: 0 2rem;
  box-shadow: 0px 0px 1rem rgba(0, 0, 0, 0.07);
  border-bottom: 1px solid $border-primary;
  height: 6.2rem;
  display: flex;
  align-items: center;
  z-index: 1;
  position: relative;
  display: flex;
  gap: 5rem;
}
</style>
