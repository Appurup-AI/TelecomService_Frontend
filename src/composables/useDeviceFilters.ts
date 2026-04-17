import { ref, computed } from 'vue'
import type { Device } from '@/types/type'

export function useDeviceFilters(deviceStore: any) {
  // Временные переменные для фильтрации
  const nameField = ref('')
  const ipAddressField = ref('')
  const typeField = ref('')
  const statusField = ref('')

  // Переменные для фильтров
  const activeFilters = ref({
    name: '',
    ipAddress: '',
    type: '',
    status: '',
  })

  // Функция для фильтрации
  const filteredDevices = computed(() => {
    let result = deviceStore.devices

    const f = activeFilters.value

    if (f.name.trim()) {
      const search = f.name.toLowerCase().trim()
      result = result.filter((device: Device) => device.name.toLowerCase().includes(search))
    }

    if (f.ipAddress.trim()) {
      const search = f.ipAddress.trim()
      result = result.filter((device: Device) => device.ipAddress.includes(search))
    }

    if (f.type) {
      result = result.filter((device: Device) => device.type === f.type)
    }

    if (f.status) {
      result = result.filter((device: Device) => device.status === f.status)
    }

    return result
  })

  // Применение фильтров
  const applyFilters = () => {
    activeFilters.value = {
      name: nameField.value,
      ipAddress: ipAddressField.value,
      type: typeField.value,
      status: statusField.value,
    }
  }

  // Сброс фильтров
  const resetFilters = () => {
    nameField.value = ''
    ipAddressField.value = ''
    typeField.value = ''
    statusField.value = ''

    activeFilters.value = {
      name: '',
      ipAddress: '',
      type: '',
      status: '',
    }
  }

  return {
    nameField,
    ipAddressField,
    typeField,
    statusField,

    filteredDevices,
    activeFilters,

    applyFilters,
    resetFilters,
  }
}
