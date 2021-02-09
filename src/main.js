import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'

// global components
import TwInput from './components/form-elements/TwInput.vue'
import TwSelect from './components/form-elements/TwSelect.vue'
import TwRadio from './components/form-elements/TwRadio.vue'
import TwCheckbox from './components/form-elements/TwCheckbox.vue'
Vue.component('TwInput', TwInput)
Vue.component('TwSelect', TwSelect)
Vue.component('TwRadio', TwRadio)
Vue.component('TwCheckbox', TwCheckbox)

delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

Vue.config.productionTip = false

Vue.use(Vuelidate)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
