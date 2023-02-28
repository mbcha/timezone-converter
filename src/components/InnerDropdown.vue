<template>
  <FloatingArea :large="large">
    <div
      v-for="(item, index) in options"
      :key="index"
      @click="onSelect(item)"
      :class="$style.item"
    >
      {{item}}
    </div>
    <div
      v-show="!options.length"
      :class="$style.notFound"
    >
      No results
    </div>
  </FloatingArea>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FloatingArea from './FloatingArea.vue'

export default defineComponent({
  components: {
    FloatingArea
  },
  props: {
    modelValue: {
      type: [String, Number],
      default: null
    },
    options: {
      type: Array,
      default: () => ([])
    },
    large: {
      type: Boolean,
      default: true
    }
  },
  emits: ['select', 'update:modelValue'],
  methods: {
    onSelect(item: string): void {
      this.$emit('update:modelValue', item)
      this.$emit('select')
    }
  }
})
</script>

<style module lang="scss">
.item {
  @include floating-list-item;
}
</style>
