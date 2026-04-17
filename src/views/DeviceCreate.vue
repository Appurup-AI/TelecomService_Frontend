<script setup>
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
import Dropdown from '@/components/Dropdown.vue'
import { useDevicesStore } from '@/stores/devices'
import { useDeviceForm } from '@/composables/useDeviceForm'

const devicesStore = useDevicesStore()

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
  clearForm,
} = useDeviceForm()

const submitForm = async () => {
  if (validateForm()) {
    const newDevice = getFormData()
    await devicesStore.addDevice(newDevice)
    clearForm()
  }
}
</script>

<template>
  <div class="container">
    <h1 class="heading-1">Добавить устройство</h1>
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
        <Button
          :label="devicesStore.loading ? 'Загрузка' : 'Создать'"
          :color="devicesStore.loading ? 'warning' : 'primary'"
        />
      </form>
    </div>
  </div>

  <div v-if="devicesStore.error" class="error">{{ error }}</div>
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
