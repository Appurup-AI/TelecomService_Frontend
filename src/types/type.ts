export enum DeviceType {
  OLT = 'OLT',
  ONT = 'ONT',
  Switch = 'Switch',
}

export enum DeviceStatus {
  Online = 'online',
  Offline = 'offline',
}

export type Device = {
  id: number
  name: string
  type: DeviceType
  ipAddress: string
  status: DeviceStatus
}

export type DeviceFormData = {
  name: string
  type: string
  ipAddress: string
  status: string
}
