Vue.component('basket-list', {
    props: ['basketItems'],
    template: `
        <div class="basket-list">
          <basket-item 
          v-bind:key="index"
          v-bind:basket-item-id="item.id_product"
          v-for="(item,index) in basketItems"
          :item="item"
          :index="index">
          </basket-item>
        </div>
      `,
  });

export default {
    name: 'basket-list'
}