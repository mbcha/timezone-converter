<template>
  <button
    :class="$style.base"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['click']
})
</script>

<style module lang="scss">
.base {
  background-color: $color-body-bg;
  border-radius: $radius;
  border: 3px solid $color-main;
  padding: 0 $spacing;
  font-weight: bold;
  color: $color-main;
  cursor: pointer;
  height: $input-height;
}
</style>
