import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Device, DeviceFormData } from '@/types/type'
import { useFetch } from '@/composables/useFetch.js'

export const useDevicesStore = defineStore('devices', () => {
  const devices = ref<Device[]>([])

  const { data, loading, error, fetchData } = useFetch()

  const addDevice = async (newDevice: Device) => {
    const device: Device = {
      ...newDevice,
    }
    await fetchData({
      url: `${import.meta.env.VITE_API_URL}/devices/`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: device,
    })

    if (!error.value) {
      devices.value.push(data.value)
    }
  }

  const editDevice = async (deviceId: Number, updatedDevice: Device) => {
    console.log(updatedDevice)
    const device: Device = {
      ...updatedDevice,
    }
    await fetchData({
      url: `${import.meta.env.VITE_API_URL}/devices/${deviceId}`,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: device,
    })

    if (!error.value) {
      const index = devices.value.findIndex((d) => d.id === deviceId)
      if (index !== -1) {
        devices.value[index] = data.value
      }
    }
  }

  const findAllDevices = async () => {
    await fetchData({
      url: `${import.meta.env.VITE_API_URL}/devices/?sortBy=id`,
      method: 'GET',
    })

    if (!error.value && data.value) {
      devices.value = data.value
      return data.value
    }
  }

  const findDevice = async (id: Number | String) => {
    await fetchData({
      url: `${import.meta.env.VITE_API_URL}/devices/${id}`,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!error.value && data.value) {
      return data.value
    }
  }

  const removeDevice = async (id: number) => {
    console.log('Splice')
    await fetchData({
      url: `${import.meta.env.VITE_API_URL}/devices/${id}`,
      method: 'DELETE',
    })

    const index = devices.value.findIndex((device: Device) => Number(device.id) === Number(id))
    if (index !== -1) {
      devices.value.splice(index, 1)
    }
  }

  return {
    devices,
    loading,
    error,
    findAllDevices,
    addDevice,
    removeDevice,
    findDevice,
    editDevice,
  }
})
