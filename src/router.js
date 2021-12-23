import { createRouter, createWebHistory } from "vue-router";

import CoachDetail from "./pages/coaches/CoachDetail.vue";
import CoachesList from "./pages/coaches/CoachesList.vue";
import CoachRegisteration from "./pages/coaches/CoachRegistration";
import ContactCoach from "./pages/requests/ContactCoach.vue";
import RequestRecieved from "./pages/requests/RequestsRecieved.vue";
import NotFound from "./pages/NotFound.vue";
import UserAuth from "./pages/auth/UserAuth.vue";
import store from './store/index.js'

const router = createRouter({
  history: createWebHistory(),
  routes: [

    { path: "/", redirect: "/coaches" },
    { path: "/coaches", component: CoachesList },
    {
      path: "/coaches/:id",
      component: CoachDetail,
      props: true,    // this defines that :id is going to be as a prop into the component
      children: [
        { path: "contact", component: ContactCoach }, // /coaches/c1/contact
      ],
    },
    { path: "/register", component: CoachRegisteration, meta: { requiresAuth: true } },
    { path: "/request", component: RequestRecieved, meta: { requiresAuth: true } },
    { path: "/auth", component: UserAuth, meta: { requiresUnauth: true } },

    
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

// router guards
router.beforeEach(function(to, _, next) {
  if(to.meta.requiresAuth && !store.getters.isAuthenticated){
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated ){
    next('/coaches');
  } else {
    next();
  }
})

export default router;