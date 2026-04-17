<script setup>
import { onMounted, ref } from 'vue'
import BaseTable from '@/components/Table/BaseTable.vue'
import TableRow from '@/components/Table/TableRow.vue'
import TableColumn from '@/components/Table/TableColumn.vue'
import Button from '@/components/Button.vue'
import Modal from '@/components/layout/Modal.vue'
import Input from '@/components/Input.vue'
import Dropdown from '@/components/Dropdown.vue'
import { useDeviceOptions } from '@/composables/useDeviceOptions'
import { useDeviceFilters } from '@/composables/useDeviceFilters'
import { useDevicesStore } from '@/stores/devices'
import { useRouter } from 'vue-router'

const devicesStore = useDevicesStore()
const router = useRouter()

// Composables
const { typeFieldOptions, statusFieldOptions } = useDeviceOptions()
const {
  nameField,
  ipAddressField,
  typeField,
  statusField,
  filteredDevices,
  applyFilters,
  resetFilters,
} = useDeviceFilters(devicesStore)
const { loading } = devicesStore

// Настройка таблицы
const tableHeads = ['id', 'Название', 'Тип', 'IP-адрес', 'Статус', '', '', '']
const tableSizeColumns = '1fr 1fr 1fr 1fr 1fr 15rem 15rem 15rem'

const showDeleteModal = ref(false)
const deviceToDelete = ref(null)

const confirmDelete = async (id) => {
  const device = devicesStore.devices.find((d) => d.id === id)

  if (device) {
    deviceToDelete.value = device
    showDeleteModal.value = true
  }
}

const cancelDelete = () => {
  showDeleteModal.value = false
  deviceToDelete.value = null
}

const performDelete = async () => {
  if (deviceToDelete.value) {
    await devicesStore.removeDevice(deviceToDelete.value.id)
  }
  showDeleteModal.value = false
  deviceToDelete.value = null
}

onMounted(async () => {
  await devicesStore.findAllDevices()
})
</script>

<template>
  <div v-if="devicesStore.error" class="error">{{ error }}</div>
  <div v-if="devicesStore.loading" class="loading">Загрузка...</div>
  <div v-else class="main-container">
    <div class="filters">
      <Input label="По названию" name="name" placeholder="По названию" v-model:value="nameField" />
      <Input
        label="По IP-адресу"
        name="ipAddress"
        placeholder="По IP-адресу"
        v-model:value="ipAddressField"
      />
      <Dropdown
        label="По типу устройства"
        name="type"
        placeholder="По типу устройства"
        v-model:value="typeField"
        :options="typeFieldOptions"
      />
      <Dropdown
        label="По статусу"
        name="status"
        placeholder="По статусу"
        v-model:value="statusField"
        :options="statusFieldOptions"
      />
      <Button color="success" label="Искать" :outlined="true" @click-on-btn="applyFilters" />
      <Button color="warning" label="Сбросить" :outlined="true" @click-on-btn="resetFilters" />
    </div>
    <base-table :head="tableHeads" :columnTemplates="tableSizeColumns">
      <table-row
        v-for="device in filteredDevices"
        :key="device.id"
        :columnTemplates="tableSizeColumns"
      >
        <table-column columnTitle="Id">{{ device.id }}</table-column>
        <table-column columnTitle="Название">{{ device.name }}</table-column>
        <table-column columnTitle="Тип">{{ device.type }}</table-column>
        <table-column columnTitle="IP-Адрес">{{ device.ipAddress }}</table-column>
        <table-column
          columnTitle="Статус"
          :class="device.status === 'online' ? 'status__online' : 'status__offline'"
          >{{ device.status }}</table-column
        >

        <table-column>
          <router-link :to="{ name: 'DeviceInfo', params: { id: device.id } }"
            ><Button color="info" label="Подробнее"
          /></router-link>
        </table-column>
        <table-column>
          <router-link :to="{ name: 'DeviceInfoEdit', params: { id: device.id } }"
            ><Button color="warning" label="Редактировать"
          /></router-link>
        </table-column>
        <table-column
          ><Button color="danger" label="Удалить" @click-on-btn="confirmDelete(device.id)"
        /></table-column>
      </table-row>
    </base-table>
  </div>

  <Modal v-model="showDeleteModal" title="Подтверждение удаления" width="42rem">
    <p>Вы действительно хотите удалить устройство?</p>
    <p v-if="deviceToDelete?.name" style="font-weight: 500; margin-top: 8px">
      <strong>{{ deviceToDelete.name }}</strong> (#{{ deviceToDelete.id }})
    </p>

    <template #footer>
      <Button color="success" label="Отмена" @click-on-btn="cancelDelete" />
      <Button color="danger" label="Удалить" @click-on-btn="performDelete" />
    </template>
  </Modal>
</template>

<style lang="scss">
.main-container {
  padding: 1rem;
}
.filters {
  margin-top: 3rem;
  display: flex;
  gap: 3rem;
}

.loading,
.error {
  text-align: center;
  margin-top: 1rem;
  font-size: 2.5rem;
}

.status {
  &__online {
    color: $success;
  }
  &__offline {
    color: $danger;
  }
}
</style>
