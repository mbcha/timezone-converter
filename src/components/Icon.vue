<template>
  <div :class="[$style.base, {
      [$style.clickable]: clickable
    }]"
    @click="$emit('click')"
  >
    <font-awesome-icon :icon="`fa-solid fa-${name}`" :size="size" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: '1x'
    },
    clickable: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click']
})
</script>

<style module lang="scss">
.base {
  color: $color-text;

  &.clickable {
    cursor: pointer;
  }
}
</style>
