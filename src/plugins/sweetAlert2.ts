import 'sweetalert2/dist/sweetalert2.min.css';
import { App } from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
export default function (app: App) {

  app.use(VueSweetalert2);
}
