import { createRouter, createWebHistory } from 'vue-router'
import ProductListView from '../views/ProductListView.vue'
import ProductEditView from '../views/ProductEditView.vue'
import ProductListView2 from '../views/ProductListView2.vue'
import ProductListView3 from '../views/ProductListView3.vue'

const routes = [
  {
    path: '/product',
    name: 'ProductListView',
    component: ProductListView
  },
  {
    path: '/product/edit/:id',
    name: 'ProductEditView',
    component: ProductEditView
  },
  {
    path: '/product2',
    name: 'ProductListView2',
    component: ProductListView2
  },
  {
    path: '/product3',
    name: 'ProductListView3',
    component: ProductListView3
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

