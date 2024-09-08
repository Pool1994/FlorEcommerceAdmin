import { App } from 'vue';
import Toast, { PluginOptions, POSITION } from 'vue-toastification';
import "vue-toastification/dist/index.css";

export default function (app: App) {
  const options: PluginOptions = {
    position: POSITION.TOP_RIGHT,
    transition: 'Vue-Toastification__fade',
    timeout: 2000,
    maxToasts: 1,

  }
  app.use(Toast, options);
}
