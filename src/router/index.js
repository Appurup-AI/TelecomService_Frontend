import { createRouter, createWebHistory } from 'vue-router'
import Devices from '@/views/Devices.vue'
import DeviceCreate from '@/views/DeviceCreate.vue'
import DeviceInfo from '@/views/DeviceInfo.vue'
import DeviceInfoEdit from '@/views/DeviceInfoEdit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/devices',
    },
    {
      path: '/devices',
      name: 'Devices',
      component: Devices,
    },
    {
      path: '/devices/create',
      name: 'DeviceCreate',
      component: DeviceCreate,
    },
    {
      path: '/devices/:id',
      name: 'DeviceInfo',
      component: DeviceInfo,
    },
    {
      path: '/devices/:id/edit',
      name: 'DeviceInfoEdit',
      component: DeviceInfoEdit,
    },
  ],
})

export default router
