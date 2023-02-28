<template>
  <div :class="[$style.base, {
    [$style.large]: large
  }]">
    <div :class="$style.inner">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    large: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style module lang="scss">
.base {
  @include floating-list;

  &.large {
    width: 95%;
  }

}

.inner {
  @include scroll-area;
}
</style>
