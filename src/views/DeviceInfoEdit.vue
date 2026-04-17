<script setup>
import { onMounted } from 'vue'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
import Dropdown from '@/components/Dropdown.vue'
import { useRoute, useRouter } from 'vue-router'
import { useDevicesStore } from '@/stores/devices'
import { useDeviceForm } from '@/composables/useDeviceForm'

const route = useRoute()
const router = useRouter()
const devicesStore = useDevicesStore()
const deviceId = route.params.id

const {
  nameField,
  typeField,
  ipAddressField,
  statusField,
  typeFieldOptions,
  statusFieldOptions,
  errors,
  validateForm,
  getFormData,
  setInitialData,
} = useDeviceForm()

onMounted(async () => {
  const device = await devicesStore.findDevice(deviceId)
  if (device) {
    setInitialData({
      name: device.name,
      type: device.type,
      ipAddress: device.ipAddress,
      status: device.status,
    })
  }
})

const submitForm = async () => {
  if (validateForm()) {
    const updatedData = getFormData()
    await devicesStore.editDevice(deviceId, updatedData)
    router.push('/devices')
  }
}
</script>

<template>
  <div v-if="devicesStore.error" class="error">{{ error }}</div>
  <div v-if="devicesStore.loading" class="loading">Загрузка...</div>
  <div v-else class="container">
    <h1 class="heading-1">Редактировать устройство #{{ deviceId }}</h1>
    <div class="form">
      <form @submit.prevent="submitForm">
        <Input
          label="Название"
          name="name"
          placeholder="Введите название"
          v-model:value="nameField"
          :error="errors.nameField"
        />

        <Dropdown
          label="Тип"
          name="type"
          placeholder="Выберите тип"
          v-model:value="typeField"
          :options="typeFieldOptions"
          :error="errors.typeField"
        />

        <Input
          label="IP-адрес"
          name="ipAddress"
          placeholder="Введите IP-адрес"
          v-model:value="ipAddressField"
          :error="errors.ipAddressField"
        />
        <Dropdown
          label="Статус"
          name="status"
          placeholder="Выберите статус"
          v-model:value="statusField"
          :options="statusFieldOptions"
          :error="errors.statusField"
        />
        <Button label="Сохранить" color="primary" />
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.heading-1 {
  text-align: center;
  margin-bottom: 5rem;
}
.form {
  display: flex;
  max-width: 144rem;
  margin: 0 auto;
  justify-content: center;
}
</style>
