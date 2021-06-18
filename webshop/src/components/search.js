Vue.component('search', {
    data: function () {
      return {
        searchLine: ''
      }
    },
  
    template: `
        <div class="search-wrapper">
          <input 
            @keydown.enter="searchGoods" 
            type="text" 
            v-model="searchLine" 
            placeholder="Введите строку поиска"/>
          <button 
            class="search-button"
            type="button"
            @click="searchGoods">
            Искать
          </button>
        </div>
      `,
  
    methods: {
      searchGoods() {
        const regExp = new RegExp(this.searchLine, 'i')
        this.$root.filteredGoods = this.$root.filter(good => regExp.test(good.product_name))
      },
    },
  });

export default {
    name: "search"
}