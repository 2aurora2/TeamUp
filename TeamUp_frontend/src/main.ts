import {createApp} from 'vue'
import App from './App.vue'
import store from "./store";
import router from "./router";
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App).use(router).use(store);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app');