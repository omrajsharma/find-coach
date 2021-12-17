import { createRouter, createWebHistory } from "vue-router";

import CoachDetail from "./pages/coaches/CoachDetail.vue";
import CoachesList from "./pages/coaches/CoachesList.vue";
import CoachRegisteration from "./pages/coaches/CoachRegistration";
import ContactCoach from "./pages/requests/ContactCoach.vue";
import RequestRecieved from "./pages/requests/RequestsRecieved.vue";
import NotFound from "./pages/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [

    { path: "/", redirect: "/coaches" },
    { path: "/coaches", component: CoachesList },
    {
      path: "/coaches:id",
      component: CoachDetail,
      children: [
        { path: "contact", component: ContactCoach }, // /coaches/c1/contact
      ],
    },
    { path: "/register", component: CoachRegisteration },
    { path: "/request", component: RequestRecieved },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

export default router;