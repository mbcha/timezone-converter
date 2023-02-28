<template>
  <div :class="$style.base">
    <div :class="[$style.inputWrapper, { [$style.inputNumbers]: numbers }]" v-click-outside="setNotTyping">
      <input
        type="dropdown"
        v-model="localValue"
        @click="onClick"
        :placeholder="placeholder"
      />
      <div>
        <Icon
          :class="$style.icon"
          v-if="!numbers"
          name="chevron-down"
          @click="onClick"
        />
      </div>
    </div>
    <InnerDropdown
      v-if="filteredOptions.length"
      v-show="showDropdown"
      v-model="localValue"
      @select="setNotTyping"
      :options="filteredOptions"
      :large="!numbers"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InnerDropdown from './InnerDropdown.vue'
import Icon from './Icon.vue'

export default defineComponent({
  components: {
    InnerDropdown,
    Icon
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
    numbers: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      required: false
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      showDropdown: false
    }
  },
  watch: {
    localValue() {
      this.setShowDropdown(true)
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
    filteredOptions() {
      if (this.numbers || this.localValue === '' || this.localValue === null) {
        return this.options
      } else {
        const regex = new RegExp(this.localValue, 'gi')
        return this.options.filter((option: string) => option.match(regex))
      }
    }
  },
  methods: {
    onClick(): void {
      this.setShowDropdown(!this.showDropdown)
    },
    setNotTyping() {
      this.setShowDropdown(false)
    },
    setShowDropdown(value: boolean): void {
      this.showDropdown = value
    }
  }
})
</script>

<style module lang="scss">
.base {
  position: relative;
  width: 100%;
}

.inputWrapper {
  @include input;
  border: 1px solid $color-border-input;
  padding: 0 $spacing;
  width: 100%;

  input {
    width: 100%;
    border: none;
    text-align: center;

    &::placeholder {
      color: $color-placeholder-text;
      font-style: italic;
      // safari
      line-height: normal;
    }
  }

  cursor: pointer;

  & > * {
    cursor: pointer;
  }
}

.item {
  @include floating-list-item;
}

.icon {
  padding-left: calc($spacing / 2);
}
</style>
