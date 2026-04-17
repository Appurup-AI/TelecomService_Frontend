<script setup>
const emits = defineEmits(['update:value'])

const props = defineProps({
  error: {
    type: Array,
    required: false,
    default: () => [],
  },
  value: {
    type: [String, Number],
    default: '',
  },
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    default: '30rem',
  },
  options: {
    type: Array,
    required: true,
    default: () => [],
  },
})

const updateValue = (e) => {
  emits('update:value', e.target.value)
}
</script>

<template>
  <div class="form-input" :style="{ width: width }">
    <select class="input-select" :name="name" :id="name" :value="value" @input="updateValue">
      <option value="" disabled selected hidden>
        {{ placeholder }}
      </option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>

    <label :for="name" class="input-label">{{ label }}</label>
  </div>
</template>

<style lang="scss" scoped>
.form-input {
  margin-bottom: 3rem;
  position: relative;
}

.input-select {
  border: 1px solid $primary;
  padding: 0 1rem;
  height: 4rem;
  border-radius: 7px;
  font-size: 1.5rem;
  width: 100%;
  position: relative;
  z-index: 1;
  background-color: white;
  color: inherit;
  cursor: pointer;

  &:focus {
    & + .input-label {
      z-index: 1;
      opacity: 1;
      top: -20px;
    }
  }

  &:not(:placeholder-shown),
  &:valid {
    & + .input-label {
      z-index: 1;
      opacity: 1;
      top: -20px;
    }
  }
}

.input-label {
  font-weight: bold;
  display: block;
  position: absolute;
  top: 2rem;
  opacity: 0;
  z-index: -1;
  transition: 0.3s;
  font-size: 1.3rem;
  color: $primary;
  pointer-events: none;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
