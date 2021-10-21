import Vue from "vue";
import App from "./App";
import VueSweetalert2 from "vue-sweetalert2";
import VModal from "vue-js-modal";
import Vuesax from "vuesax";


import "vuesax/dist/vuesax.css"; //Vuesax styles
import "material-icons/iconfont/material-icons.css";
import "sweetalert2/dist/sweetalert2.min.css";

Vue.use(Vuesax);

Vue.use(VModal, { dynamic: true, injectModalsContainer: true });
Vue.use(VueSweetalert2);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  template: "<App/>",
  components: { App }
});
