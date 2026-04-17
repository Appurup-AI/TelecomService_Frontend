<script setup>
const props = defineProps({
  head: {
    type: Array,
    required: false,
  },
  columnTemplates: {
    type: String,
    required: false,
  },
})
</script>

<template>
  <div class="table-wrapper">
    <div class="table">
      <div class="table-head" :style="{ 'grid-template-columns': columnTemplates }">
        <div
          v-for="(element, i) in head"
          :key="i"
          @click="clickOnHead(element)"
          class="table-head__name"
        >
          {{ element }}
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.table {
  background-color: var(--bg-primary);
  width: 100%;
  margin-bottom: 40px;
  margin-top: 15px;
  &-wrapper {
    display: flex;
    justify-content: center;
  }
  &-head {
    padding: 5px 16px;
    display: grid;
    column-gap: 10px;
    align-items: center;
    border-bottom: 2px solid #eee;
    background: var(--bg-primary);
    &__name {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      cursor: pointer;
    }
    @media screen and (max-width: 767px) {
      display: none;
    }
  }
}
</style>
