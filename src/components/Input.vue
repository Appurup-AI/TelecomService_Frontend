<script setup>
const emits = defineEmits(['update:value'])
const props = defineProps({
  error: { type: Array, required: false },
  value: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    required: true,
  },
  label: {
    required: true,
  },
  width: {
    type: String,
    default: '30rem',
  },
})

const updateValue = (e) => {
  emits('update:value', e.target.value)
}
</script>
<template>
  <div class="form-input" :style="{ width: width }">
    <input
      class="input-text"
      :type="type"
      :name="name"
      :id="name"
      :placeholder="placeholder"
      :value="value"
      @input="updateValue"
    />
    <label :for="name" class="input-label">{{ label }}</label>
    <TransitionGroup>
      <div class="form-error" v-for="(element, index) of error" :key="index">
        <div class="form-error__message">{{ element }}</div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style lang="scss" scoped>
.form {
  &-input {
    margin-bottom: 3rem;
    position: relative;
  }
  &-error {
    background: $danger;
    margin-top: 0.4rem;
    border-radius: 0.7rem;
    font-size: 1.3rem;
    color: #fff;
    padding: 0.5rem;
  }
}
.input {
  &-text {
    border: 1px solid $primary;
    padding: 0 1rem;
    height: 4rem;
    border-radius: 0.7rem;
    font-size: 1.5rem;
    width: 100%;
    position: relative;
    z-index: 1;
    &:focus {
      & + .input-label {
        z-index: 1;
        opacity: 1;
        top: -2rem;
      }
    }
    &:not(:placeholder-shown) {
      & + .input-label {
        z-index: 1;
        opacity: 1;
        top: -2rem;
      }
    }
  }
  &-label {
    font-weight: bold;
    display: block;
    position: absolute;
    top: 2rem;
    opacity: 0;
    z-index: -1;
    transition: 0.3s;
    font-size: 1.3rem;
    color: $primary;
  }
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
