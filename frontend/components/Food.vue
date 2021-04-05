<template>
  <main class="food">
    <a-card hoverable>
      <img :src="image" slot="cover" :alt="name" :height="200" />
      <a-card-meta :title="name">
        <template slot="description">
          <h4 class="price">{{ itemPrice }} Rwf</h4>
          <p>{{ quantity }} X</p>
        </template>
      </a-card-meta>
    </a-card>
  </main>
</template>

<script>
import { computed } from "@vue/composition-api";
import numeral from "numeral";
export default {
  props: {
    image: {
      type: String
    },
    price: {
      type: Number
    },
    name: {
      type: String
    },
    quantity: {
      type: Number
    }
  },
  setup(ctx) {
    const itemPrice = computed(() => numeral(ctx.price).format("0,0"));

    return {
      itemPrice
    };
  }
};
</script>
<style scoped>
.price {
  color: #0a4d98;
}
</style>
