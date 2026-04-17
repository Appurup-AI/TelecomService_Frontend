<script setup>
const props = defineProps({
  label: {
    type: String,
    default: 'Button',
  },
  color: {
    type: String,
    default: 'primary',
  },
  rounded: {
    type: Boolean,
    required: false,
  },
  disabled: {
    type: Boolean,
    required: false,
  },
  outlined: {
    type: Boolean,
    required: false,
  },

  size: {
    type: String,
    default: 'normal',
  },
})

const emit = defineEmits(['clickOnBtn'])

const clickOnButton = () => {
  emit('clickOnBtn')
}
</script>
<template>
  <button
    :class="[
      'btn',
      `btn__${color}`,
      { btn__rounded: rounded },
      { btn__outlined: outlined },

      { btn__large: size === 'large' },
    ]"
    :disabled="disabled"
    @click="clickOnButton"
  >
    <span>{{ label }}</span>
  </button>
</template>

<style lang="scss" scoped>
.btn {
  margin-right: 1rem;
  margin-bottom: 1rem;
  padding: 0 2rem;
  height: 4rem;
  color: #fff;
  border-radius: 0.7rem;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  transition: 0.2s;
  &__primary {
    background: $primary;
    border: 1px solid $primary;
    &:enabled:hover {
      background: $primary-hover;
    }
  }
  &__second {
    background: $second;
    border: 1px solid $second;
    &:enabled:hover {
      background: $second-hover;
    }
  }
  &__success {
    background: $success;
    border: 1px solid $success;
    &:enabled:hover {
      background: $success-hover;
    }
  }
  &__info {
    background: $info;
    border: 1px solid $info;
    &:enabled:hover {
      background: $info-hover;
    }
  }
  &__warning {
    background: $warning;
    border: 1px solid $warning;
    &:enabled:hover {
      background: $warning-hover;
    }
  }
  &__danger {
    background: $danger;
    border: 1px solid $danger;
    &:enabled:hover {
      background: $danger-hover;
    }
  }
  &__rounded {
    border-radius: 1.5rem;
  }
  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
  &__outlined {
    background: transparent;
    color: #000;
    &:hover {
      color: #fff;
    }
  }
  &__large {
    height: 4.8rem;
    padding: 0 3rem;
  }
}
</style>
