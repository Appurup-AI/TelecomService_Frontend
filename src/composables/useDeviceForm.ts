import { ref, reactive } from 'vue'
import { useDeviceOptions } from './useDeviceOptions'
import type { DeviceFormData, DeviceStatus, DeviceType } from '@/types/type'

export function useDeviceForm(initialData: Partial<DeviceFormData> = {}) {
  const { typeFieldOptions, statusFieldOptions } = useDeviceOptions()

  // Поля формы
  const nameField = ref(initialData.name || '')
  const typeField = ref(initialData.type || '')
  const ipAddressField = ref(initialData.ipAddress || '192.168.1.1')
  const statusField = ref(initialData.status || '')

  // Ошибки
  const errors = reactive({
    nameField: [] as string[],
    typeField: [] as string[],
    ipAddressField: [] as string[],
    statusField: [] as string[],
  })

  const isValidIP = (ip: string): boolean => {
    if (!ip) return false
    const ipv4Regex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    return ipv4Regex.test(ip.trim())
  }

  const validateForm = (): boolean => {
    // Сброс ошибок
    errors.nameField = []
    errors.typeField = []
    errors.ipAddressField = []
    errors.statusField = []

    let isValid = true

    if (!nameField.value?.trim()) {
      errors.nameField.push('Введите название')
      isValid = false
    }

    if (!ipAddressField.value || !isValidIP(ipAddressField.value)) {
      errors.ipAddressField.push('Введите корректный IP-адрес (например: 192.168.1.1)')
      isValid = false
    }

    if (!typeField.value) {
      errors.typeField.push('Выберите тип устройства')
      isValid = false
    }

    if (!statusField.value) {
      errors.statusField.push('Выберите статус')
      isValid = false
    }

    return isValid
  }

  const getFormData = (): DeviceFormData => ({
    name: nameField.value.trim(),
    type: typeField.value as DeviceType,
    ipAddress: ipAddressField.value.trim(),
    status: statusField.value as DeviceStatus,
  })

  const clearForm = () => {
    nameField.value = ''
    typeField.value = ''
    ipAddressField.value = '192.168.1.1'
    statusField.value = ''
  }

  const setInitialData = (data: Partial<DeviceFormData>) => {
    nameField.value = data.name || ''
    typeField.value = data.type || ''
    ipAddressField.value = data.ipAddress || ''
    statusField.value = data.status || ''
  }

  return {
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
    setInitialData,
  }
}
