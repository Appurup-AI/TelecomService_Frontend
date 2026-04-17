<script setup>
import { ref, onMounted } from 'vue'

import { useRoute } from 'vue-router'
const route = useRoute()
const device = ref('')

import { useDevicesStore } from '@/stores/devices'
const devicesStore = useDevicesStore()
const deviceId = route.params.id

onMounted(async () => {
  device.value = await devicesStore.findDevice(deviceId)
})
</script>

<template>
  <div class="container">
    <div v-if="devicesStore.loading" class="loading">Loading...</div>
    <div v-if="device" class="info">
      <div class="info__heading">
        <span class="info__heading--primary">Id:</span>
        <span>{{ device.id }}</span>
      </div>
      <div class="info__heading">
        <span class="info__heading--primary">Название:</span>
        <span>{{ device.name }}</span>
      </div>
      <div class="info__heading">
        <span class="info__heading--primary">Тип:</span>
        <span>{{ device.type }}</span>
      </div>
      <div class="info__heading">
        <span class="info__heading--primary">IP-Адрес:</span>
        <span>{{ device.ipAddress }}</span>
      </div>
      <div class="info__heading">
        <span class="info__heading--primary">Статус:</span>
        <span>{{ device.status }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 50rem;
  margin: 0 auto;

  .info {
    margin-top: 3rem;
    padding: 2rem;
    border: 1px solid $primary;
    border-radius: 1rem;
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
    &__heading {
      font-size: 1.8rem;
      &--primary {
        font-size: 2rem;
        font-weight: 700;
        margin-right: 1rem;
      }
    }
  }
}
</style>
