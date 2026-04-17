export function useDeviceOptions() {
  const typeFieldOptions = [
    { value: 'OLT', label: 'OLT' },
    { value: 'ONT', label: 'ONT' },
    { value: 'Switch', label: 'Switch' },
  ]

  const statusFieldOptions = [
    { value: 'online', label: 'Online' },
    { value: 'offline', label: 'Offline' },
  ]

  return {
    typeFieldOptions,
    statusFieldOptions,
  }
}
