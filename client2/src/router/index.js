import Vue from "vue";
import VueRouter from "vue-router";
import Catalogue from "../views/Catalogue.vue"
import ViewProduct from "../views/ViewProduct.vue"
import AdminPanel from "../views/AdminPanel.vue"






Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "catalogue",
    component: Catalogue,
  },
  {
    path: "/product:id",
    name: "product",
    component: ViewProduct,
  },
  {
    path: "/admin_panel",
    name: "admin_panel",
    component:AdminPanel
  }
 
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
