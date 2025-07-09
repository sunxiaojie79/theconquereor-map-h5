import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import VueAMap, { initAMapApiLoader } from "@vuemap/vue-amap";
import "@vuemap/vue-amap/dist/style.css";

import "./style.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueAMap);

app.mount("#app");
