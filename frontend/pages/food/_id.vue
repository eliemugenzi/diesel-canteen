<template>
  <main class="food-detail">
    <a-icon v-if="fetchingFood" type="loading"></a-icon>
    <div class="food-wrapper" v-else>
      <img :src="singleFood.image" alt="" />
      <div class="useless">
        <h2>{{ singleFood.name }}</h2>
        <p>{{ singleFood.description }}</p>
        <a-form>
          <a-form-item label="Quantity">
            <a-input-number
              :min="1"
              :max="singleFood.quantity"
              :default-value="1"
            ></a-input-number>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit" class="button"
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
import useStore from "../../store";
export default {
  async asyncData({ params }) {
    const store = useStore();
    store.dispatch("getSingleFood", {
      id: params.id
    });
  },
  methods: {
    ...mapActions(["getSingleFood"])
  },
  computed: {
    ...mapGetters(["food404", "fetchingFood", "singleFood"])
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
}

.button {
  background: #0a4d98;
}
</style>
