<template>
  <main>
    <div class="search-bar">
      <h2>Stock</h2>
      <div class="search-wrapper">
        <a-input-search
          placeholder="Search"
          v-model="query"
          @change="v => handleType(v)"
        >
        </a-input-search>

        <a-button
          type="primary"
          class="add-item"
          @click="$router.push('/new-item')"
          >Add Item</a-button
        >
      </div>
    </div>
    <div class="search-results" v-if="searchData.length !== 0">
      <h3>Search Results</h3>
      <a-icon type="loading" v-if="searching"></a-icon>
      <a-row v-else :gutter="16">
        <a-col v-for="food in searchData" :key="food._id" :span="4">
          <nuxt-link :to="`/food/${food._id}`">
            <food
              :name="food.name"
              :image="food.image"
              :price="food.price"
              :quantity="food.quantity"
              @click="selected(food)"
            />
          </nuxt-link>
        </a-col>
      </a-row>
    </div>
    <div class="food-list" v-if="searchData.length === 0">
      <h3>Food</h3>
      <a-empty v-if="!gettingFood && foodList.length === 0"></a-empty>
      <a-icon type="loading" v-if="gettingFood"></a-icon>
      <a-row v-else :gutter="16">
        <a-col v-for="food in foodList" :key="food._id" :span="4">
          <nuxt-link :to="`/food/${food._id}`">
            <food
              :name="food.name"
              :image="food.image"
              :price="food.price"
              :quantity="food.quantity"
              @click="selected(food)"
            />
          </nuxt-link>
        </a-col>
      </a-row>
    </div>
    <div class="drinks-list" v-if="searchData.length === 0">
      <h3>Drinks</h3>

      <a-empty v-if="!gettingDrinks && drinkList.length === 0"></a-empty>
      <a-icon v-if="gettingDrinks" type="loading"></a-icon>
      <a-row v-else :gutter="16">
        <a-col v-for="food in drinkList" :key="food._id" :span="4">
          <nuxt-link :to="`/food/${food._id}`">
            <food
              :name="food.name"
              :image="food.image"
              :price="food.price"
              :quantity="food.quantity"
              @click="selected(food)"
            />
          </nuxt-link>
        </a-col>
      </a-row>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Food from "../../components/Food";
export default {
  computed: {
    ...mapGetters([
      "isLoggedIn",
      "foodList",
      "drinkList",
      "gettingFood",
      "gettingDrinks",
      "searchData",
      "searching"
    ])
  },
  beforeMount() {
    if (!this.isLoggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    ...mapActions(["getFoods", "searchFood"]),
    selected(food) {
      this.$router.push(`/food/${food._id}`);
    },
    handleType(q) {
      this.searchFood({ query: this.query });
    }
  },
  mounted() {
    this.getFoods({
      type: "food"
    });

    this.getFoods({
      type: "drinks"
    });
    console.log({ searchData: this.searchData });
  },
  components: {
    Food
  },

  data() {
    return {
      query: null
    };
  }
};
</script>

<style scoped>
.search-bar {
  display: flex;
  justify-content: space-between;
  margin: 30px 10%;
}

.search-wrapper {
  display: flex;
  justify-content: space-around;
}

.add-item {
  margin: 0 20px;
}

.food-list,
.drinks-list {
  margin: 30px 10%;
}
</style>
