import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Pocetna',
    component: () => import ('../views/Pocetna.vue')
  },
  {
    path: '/login',
    name: 'Pocetna',
    component: () => import ('../views/Pocetna.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/detaljiproizvoda/:id',
    name: 'DetaljiProizvoda',
    component: () => import ('../views/DetaljiProizvoda.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import ('../views/Admin.vue')
  },
  {
    path: '/kupacDostupne',
    name: 'KupacDostupne',
    component: () => import ('../views/KupacDostupne.vue')
  },
  {
    path: '/kupacPromocija',
    name: 'KupacPromocija',
    component: () => import ('../views/KupacPromocija.vue')
  },
  {
    path: '/kupacPreporucene',
    name: 'KupacPreporucene',
    component: () => import ('../views/KupacPreporucene.vue')
  },
  {
    path: '/kupacLicniPodaci',
    name: 'KupacLicniPodaci',
    component: () => import ('../views/KupacLicniPodaci.vue')
  },
  {
    path: '/kupacLozinka',
    name: 'KupacLozinka',
    component: () => import ('../views/KupacLozinka.vue')
  },
  {
    path: '/detaljiKnjige/:id',
    name: 'DetaljiKnjige',
    component: () => import ('../views/DetaljiKnjige.vue')
  },
  {
    path: '/preporuka',
    name: 'KupacPreporuka',
    component: () => import ('../views/KupacPreporuka.vue')
  },
  {
    path: '/prodavacPregled',
    name: 'ProdavacPregled',
    component: () => import ('../views/ProdavacPregled.vue')
  },
  {
    path: '/prodavacUnos',
    name: 'ProdavacUnos',
    component: () => import ('../views/ProdavacUnos.vue')
  },
  {
    path: '/prodavacLicniPodaci',
    name: 'ProdavacLicniPodaci',
    component: () => import ('../views/ProdavacLicniPodaci.vue')
  },
  {
    path: '/prodavacLozinka',
    name: 'ProdavacLozinka',
    component: () => import ('../views/ProdavacLozinka.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
