<script setup>
import { onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '500px',
  },
  closeOnEsc: {
    type: Boolean,
    default: true,
  },
  closeOnOverlayClick: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['update:modelValue', 'close'])

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleEsc = (e) => {
  if (e.key === 'Escape' && props.closeOnEsc) {
    close()
  }
}

const handleOverlayClick = (e) => {
  if (e.target === e.currentTarget && props.closeOnOverlayClick) {
    close()
  }
}

onMounted(() => {
  if (props.closeOnEsc) {
    document.addEventListener('keydown', handleEsc)
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEsc)
})
</script>

<template>
  <Teleport to="body">
    <div v-if="modelValue" class="modal-overlay" @click="handleOverlayClick">
      <div class="modal-content" :style="{ width }" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">{{ title }}</h3>
          <button class="modal-close" @click="close">×</button>
        </div>

        <div class="modal-body">
          <slot />
        </div>

        <div class="modal-footer" v-if="$slots.footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.modal {
  &-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    animation: fadeIn 0.2s ease;
  }

  &-content {
    background: white;
    border-radius: 1.2rem;
    box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.3);
    position: relative;
    max-height: 90vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    animation: scaleIn 0.2s ease;
  }

  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.6rem 2rem;
    border-bottom: 1px solid #eee;
  }

  &-close {
    background: none;
    border: none;
    font-size: 2.8rem;
    line-height: 1;
    cursor: pointer;
    color: #999;
    padding: 0 0.8rem;
    transition: color 0.2s;

    &:hover {
      color: #333;
    }

    // &.standalone {
    //   position: absolute;
    //   top: 1.2rem;
    //   right: 1.6rem;
    //   z-index: 10;
    // }
  }

  &-body {
    padding: 2rem;
    overflow-y: auto;
    flex: 1;
  }

  &-title {
    margin: 0;
    font-size: 1.8rem;
    font-weight: 600;
    color: #333;
  }

  &-footer {
    padding: 1.6rem 2rem;
    border-top: 1px solid #eee;
    display: flex;
    gap: 12px;
    justify-content: flex-end;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
