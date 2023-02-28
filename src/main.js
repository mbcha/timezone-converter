import './styles/index.scss';
import './fontAwesomeIcons'
import { createApp } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import directives from './directives'
import dayjs from './dayjs'
import App from './App.vue'

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)

app.config.globalProperties.$dayjs = dayjs

Object.keys(directives).forEach(key => {
    app.directive(key, directives[key])
})

app.mount('#app')