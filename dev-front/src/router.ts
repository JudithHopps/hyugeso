import { createWebHistory, createRouter } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./pages/HomeView.vue'),
  },
  {
    path: '/signIn',
    name: 'Sign in',
    component: () => import('./pages/UserPages/SignInView.vue'),
  },
  {
    path: '/signUp',
    name: 'Sign up',
    component: () => import('./pages/UserPages/SignUpView.vue'),
  },
  {
    path: '/findId',
    name: 'Find Id',
    component: () => import('./pages/UserPages/FindIdView.vue'),
  },

  {
    path: '/qna',
    name: 'Q & A',
    component: () => import('./pages/QnAPages/QaView.vue'),
  },
  {
    path: '/post',
    name: 'Post',
    component: () => import('./pages/QnAPages/PostView.vue'),
  },
  {
    path: '/resting',
    name: 'Resting',
    component: () => import('./pages/RestingPages/RestingView.vue'),
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('./pages/SearchView.vue'),
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import('./pages/DetailView.vue'),
  },
  // {
  //   path: "/road",
  //   name: "Road",
  //   component: () => import("./pages/whatView.vue"),
  // },
  // {
  //   path: "/benefit",
  //   name: "Rest",
  //   component: () => import("./pages/benefitView.vue"),
  // },
  // {
  //   path: "/post",
  //   name: "Post",
  //   component: () => import("./pages/postView.vue"),
  // },
  // {
  //   path: "/menu",
  //   name: "Menu",
  //   component: () => import("./pages/menuView.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
