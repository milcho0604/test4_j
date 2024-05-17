<!-- Product3Child.vue -->

<template>
  <div>
    <table>
    <h2>제품 등록</h2>
    <div class="input-container">
      <div>
        <label for="childTitle">품명:</label>
        <input type="text" v-model="childProduct.title" id="childTitle" class="input-field" />
      </div>
      <div>
        <label for="childPrice">가격: </label>
        <input type="number" v-model="childProduct.price" id="childPrice" class="input-field" />
      </div>
      <div>
        <label for="childCategory">분류:</label>
        <select v-model="childProduct.category" id="childCategory" class="input-field">
          <option value="">카테고리를 선택하세요</option>
          <option value="음료수">음료수</option>
          <option value="과자">과자</option>
          <option value="주류">주류</option>
        </select>
      </div>
      <div>
        <button type="button" @click="saveChildProduct">등록</button>
      </div>
    </div>
  </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      childProduct: {
        title: '',
        price: 0,
        category: '',
      },
    };
  },
  methods: {
    saveChildProduct() {
      // 입력된 제품 데이터를 부모 컴포넌트로 전달
      this.$emit('save', this.childProduct);
      // 입력 폼 초기화
      this.childProduct = {
        title: '',
        price: 0,
        category: '',
      };
    },
  },
};
</script>

<style scoped>
table{
  width: 600px;
  margin-left: 300px;
  background-color: bisque;
  text-align: left;
}
</style>
