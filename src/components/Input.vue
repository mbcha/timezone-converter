<template>
  <div :class="$style.base">
    <div :class="$style.input"
      v-click-outside="setNotTyping"
    >
      <input
        :type="type"
        v-model="localValue"
        :placeholder="placeholder"
        @input="onInput"
        @click="onClick"
      />
    </div>
    <BaseInnerDropdown
      v-if="dropdownData.length"
      v-show="isTyping"
      v-model="localValue"
      @select="setNotTyping"
      :options="dropdownData"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseInnerDropdown from './InnerDropdown.vue'

export default defineComponent({
  components: {
    BaseInnerDropdown
  },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: null
    },
    dropdownData: {
      type: Array,
      default: () => ([])
    },
    modelValue: {
      type: [String, Number],
      default: null
    }
  },
  emits: ['click', 'update:modelValue'],
  data() {
    return {
      isTyping: false
    }
  },
  computed: {
    localValue: {
      get(): string | number | undefined {
        return this.modelValue
      },
      set(value: string): void {
        this.$emit('update:modelValue', value)
      }
    },
    uniqueId(): string {
      const uid = Math.round(Math.random() * 100000).toString()
      return `input-${uid}`
    }
  },
  methods: {
    onInput(): void {
      this.setIsTyping(true)
    },
    onClick(): void {
      this.setIsTyping(!this.isTyping)
    },
    setNotTyping() {
      this.setIsTyping(false)
    },
    setIsTyping(value: boolean): void {
      this.isTyping = value
    }
  }
})
</script>

<style module lang="scss">
.base {
  position: relative;
}

.input {
  @include input;
  border: 1px solid $color-border-input;
  padding: 0 $spacing;

  input {
    border: none;
  }

  textarea {
    border: none;
    margin: ($spacing / 2) 0;
  }
}

.item {
  @include floating-list-item;
}
</style>
