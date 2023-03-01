<template>
  <div :class="$style.mainContainer">
    <div :class="$style.zoneContainer">
      <Dropdown
        v-model="originalTimeZone"
        :options="timeZones"
        :showAllOptions="showAllTimezones"
        placeholder="Timezone to convert from"
      />
    </div>
    <div :class="$style.timeContainer">
      <div :class="$style.timeDropdown">
        <Dropdown
          numbers
          v-model="originalHour"
          :options="hourOptions"
        />
      </div>
      <p :class="$style.timeSeparator">:</p>
      <div :class="$style.timeDropdown">
        <Dropdown
          numbers
          v-model="originalMinutes"
          :options="minutesOptions"
        />
      </div>
    </div>
    <Icon
      :class="$style.icon"
      name="arrows-rotate"
      @click="onClickIcon"
    />
    <div :class="$style.zoneContainer">
      <Dropdown
        v-model="newTimeZone"
        :options="timeZones"
        placeholder="Timezone to convert to"
      />
    </div>
    <Button @click="convertTime">
      Convert
    </Button>
    <p
      v-if="buttonIsClicked && (!newTimeZone || !originalTimeZone)"
      :class="$style.warning"
    >
      * Select both time zones
    </p>
    <div :class="$style.convertedTimeContainer" v-if="convertedTime">
      <p>Time in selected timezone:</p>
      {{ convertedTime }}
    </div>
  </div>
</template>

<script>
import Dropdown from './components/Dropdown.vue'
import Button from './components/Button.vue'
import Icon from './components/Icon.vue'

export default {
  components: {
    Dropdown,
    Button,
    Icon
  },
  data() {
    return {
      originalTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      originalHour: new Date().getHours(),
      originalMinutes: new Date().getMinutes(),
      hourOptions: [...Array(24).keys()].slice(1).map(n => n.toString()),
      minutesOptions: [...Array(60).keys()].map(n => n.toString()),
      newTimeZone: null,
      convertedTime: null,
      buttonIsClicked: false,
      showAllTimezones: true
    }
  },
  watch: {
    newTimeZone() {
      this.buttonIsClicked = false
    },
    originalTimeZone() {
      this.showAllTimezones = false
    }
  },
  computed: {
    timeZones() {
      return Intl.supportedValuesOf('timeZone')
    }
  },
  methods: {
    convertTime() {
      this.buttonIsClicked = true
      if (this.newTimeZone) {
        const originalDateTime = this.$dayjs.tz(`${this.originalHour}:${this.originalMinutes}`, 'HH:mm', this.originalTimeZone)
        this.convertedTime = originalDateTime.tz(this.newTimeZone).format('HH:mm')
      }
    },
    onClickIcon() {
      const currentOriginalTimezone = this.originalTimeZone
      this.originalTimeZone = this.newTimeZone
      this.newTimeZone = currentOriginalTimezone
    }
  }
}
</script>


<style module lang="scss">
.mainContainer {
  padding-top: $spacing * 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;

  & > * {
    margin: calc($spacing / 2) 0;
  }
}

.originalTimeContainer {
  display: flex;
  justify-content: space-around;
}

.timeContainer {
  display: flex;
  justify-content: space-around;
  align-items: baseline;
}

.zoneContainer {
  width: 275px;
  text-align: center;

  @media screen and (max-width: 600px) {
    width: 90%;
  }
}

.timeDropdown {
  width: 65px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.timeSeparator {
  padding: 0 calc($spacing / 2);
}

.convertedTimeContainer {
  text-align: center;
  font-weight: bold;
}

.warning {
  color: $red;
}

.icon {
  cursor: pointer;
}
</style>
