<!-- ProductListView3.vue -->

<template>
  <div id="ProductListView3">
    <div class="header">
      <h1>제품 목록</h1>
    </div>
    <table>
      <tr>
        <td></td><td>id</td><td>품명</td><td>가격</td><td>분류</td><td></td>
      </tr>
      <tr v-for="product in products" :key="product.id">
        <td><input type="checkbox" v-model="product.checked" @click.stop /></td>
        <td>{{ product.id }}</td>
        <td>{{ product.title }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.category }}</td>
        <td><button type="button" @click="remove(product.id)">삭제</button></td>
      </tr>
    </table>

    <!-- 총액은 가격 price의 합 -->
    <div>총액: {{ total }}</div>

  
    <!-- 자식 컴포넌트 사용 -->
    <Product3Child @save="saveProduct" />

  </div>
</template>

<script>
import { loadProducts, deleteProduct, insertProduct } from '../productService';
import Product3Child from './Product3Child';

export default {
  name: "ProductListView3",
  components: {
    Product3Child,
  },
  data() {
    return {
      products: [],
      product: {
        title: '',
        price: 0,
        category: '',
      },
    };
  },
  computed: {
    total() {
      return this.products.reduce((sum, product) => sum + product.price, 0);
    },
  },
  async mounted() {
    this.products = await loadProducts();
  },
  methods: {
    async reload() {
      this.products = await loadProducts();
    },
    async remove(productId) {
      const selectedProduct = this.products.find(product => product.id === productId);
      if (confirm('선택한 제품을 삭제하시겠습니까?')) {
        await deleteProduct(selectedProduct.id);
        this.reload();
      }
    },
    async saveProduct(childProduct) {
      // 자식 컴포넌트로부터 emit된 save 이벤트를 처리하는 메소드
      await insertProduct(childProduct);
      // 등록 후에 입력창 초기화
      this.reload();
    },
    async save() {
      await insertProduct(this.product);
      // 등록 후에 입력창 초기화
      this.product = {
        title: '',
        price: 0,
        category: '',
      };
      this.reload();
    },
  },
};
</script>

<style scoped>

.header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

button {
  padding: 5px 20px;
  margin-top: 10px;
}

h1 {
  font-size: 35px;
  margin-left: 10px;
}

table {
  border-collapse: collapse;
  width: 60%;
  margin: auto;
}

tr:nth-child(1) {
  background-color: #eee;
  text-align: center;
}

td {
  border: 1px solid gray;
  padding: 6px;
}

td:nth-child(1) {
  text-align: center;
  width: 30px;
}

tr:hover {
  background-color: #ffd;
  cursor: pointer;
}

tr.done {
  background-color: #f8f8f8;
  color: #bbb;
  text-decoration: line-through;
}

/* 자식 컴포넌트의 위치 및 스타일 */
Product3Child {
  margin-top: 20px;
}
div:nth-child(3){
  margin-left: 250px;
}

</style>
