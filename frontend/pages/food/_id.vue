<template>
  <main class="food-detail">
    <a-alert
      v-if="food404"
      type="error"
      :description="food404"
      class="error-message"
      closable
    ></a-alert>
    <a-alert
      v-if="placed"
      type="success"
      :description="placed"
      class="error-message"
      closable
    ></a-alert>
    <a-alert
      v-if="placeFailed"
      type="error"
      :description="placeFailed"
      class="error-message"
      closable
    ></a-alert>
    <a-icon v-if="fetchingFood" type="loading"></a-icon>
    <div class="food-wrapper" v-else>
      <img :src="singleFood.image" alt="" class="food-image" />
      <div class="useless">
        <h2>{{ singleFood.name }}</h2>
        <p>{{ singleFood.description }}</p>
        <a-form @submit.prevent="handleSubmit">
          <a-form-item label="Quantity">
            <a-input-number
              :min="1"
              :max="singleFood.quantity"
              :default-value="1"
              v-model="quantity"
            ></a-input-number>
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              html-type="submit"
              class="button"
              :loading="placing"
              >Place an order</a-button
            >
          </a-form-item>
        </a-form>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import useStore, { store } from "../../store";
export default {
  async asyncData({ params }) {
    const store = useStore();
    store.dispatch("getSingleFood", {
      id: params.id
    });
  },
  methods: {
    ...mapActions(["getSingleFood", "placeOrder"]),
    handleSubmit() {
      store.dispatch("placeOrder", {
        id: this.$route.params.id,
        data: {
          quantity: this.quantity
        }
      });
    }
  },
  computed: {
    ...mapGetters([
      "food404",
      "fetchingFood",
      "singleFood",
      "placing",
      "placed",
      "placeFailed"
    ])
  },
  data() {
    return {
      quantity: 1
    };
  }
};
</script>

<style scoped>
.food-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.food-detail {
  margin: auto 10%;
}

.useless {
  align-self: center;
  margin-left: 30px;
}

.button {
  background: #0a4d98;
}

.food-image {
  width: 50%;
}

.error-message {
  margin: 20px auto;
}
</style>
