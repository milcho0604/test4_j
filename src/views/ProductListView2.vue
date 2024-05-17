<template>
  <div id="ProductListView">
    <div class="header">
      <h1>제품 목록</h1>
    </div>
    <table>
      <tr>
        <td></td><td>id</td><td>제품명</td><td>가격</td><td>카테고리</td><td></td>
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
    <div>
    <!-- input-filed 클래스 적용하여 유연하게 style서식 적용 가능  -->
    <input type="text" v-model="product.title" placeholder="제품명 입력" class="input-field" />
    <input type="number" v-model="product.price" placeholder="가격 입력" class="input-field" />
    <select v-model="product.category" class="input-field">
      <option value="">카테고리를 선택하세요</option>
      <option value="음료수">음료수</option>
      <option value="과자">과자</option>
      <option value="주류">주류</option>
    </select>
    <button type="button" @click="save">등록</button>
    <button type="button" @click="reload">새로고침</button>
  </div>
  </div>
</template>

<script>
import { loadProducts, deleteProduct, insertProduct } from '../productService';

export default {
  name: "ProductListView",
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
    // price의 합 quantity는 없음
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
  //  체크박스를 선택하지 않아도 삭제가 가능함 
    async remove(productId) {
  const selectedProduct = this.products.find(product => product.id === productId);
  if (confirm('선택한 제품을 삭제하시겠습니까?')) {
    await deleteProduct(selectedProduct.id);
    this.reload();
  }
},
  // 체크 박스를 선택하지 않으면 삭제되지 않음
  // async remove() {
  //       const removeIds = this.products
  //       .filter(product => product.checked)
  //       .map(product => product.id);
  //       if (confirm('선택한 제품을 삭제하시겠습니까?')) {
  //       await Promise.all(removeIds.map(id => deleteProduct(id)));
  //       this.reload();
  //     }
  //     },
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
/* 스타일 부분은 변경하지 않았습니다. */
</style>

  
  <style scoped>
  div.header {
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
  div:nth-child(3) {
    margin-left: 250px;
    margin-top: 5px;
  }
  div:nth-child(4) {
    padding: 5px 20px;
    margin-left: 230px;
    margin-top: 10px;
  }
  div:nth-child(5) {
    padding: 5px 20px;
    margin-left: 230px;
    margin-top: 10px;
  }
  .input-field:nth-child(1) {
  width: 200px; /* 원하는 넓이로 조절 */
  height: 20px; /* 원하는 높이로 조절 */
  margin-right: 10px; /* 필요에 따라 조절 */
}
.input-field:nth-child(2) {
  width: 200px; /* 원하는 넓이로 조절 */
  height: 30px; /* 원하는 높이로 조절 */
  margin-right: 10px; /* 필요에 따라 조절 */
}
.input-field:nth-child(3) {
  width: 200px; /* 원하는 넓이로 조절 */
  height: 35px; /* 원하는 높이로 조절 */
  margin-right: 10px; /* 필요에 따라 조절 */
}
  </style>
  