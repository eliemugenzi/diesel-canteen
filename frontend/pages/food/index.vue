<template>
  <main>
    <div class="search-bar">
      <div class="filter-wrapper">
        <h2>Stock</h2>
        <a-dropdown class="filter-drop">
          <a
            href="javascript:;"
            class="a-dropdown-link"
            @click="e => e.preventDefault()"
          >
            {{ location }}
            <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item @click="switchLocation('Gishushu Canteen')">
              <a href="javascript:;">Gishushu Canteen</a>
            </a-menu-item>
            <a-menu-item @click="switchLocation('Masoro Canteen')">
              <a href="javascript:;">Masoro Canteen</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
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
    ...mapActions(["getFoods", "searchFood", "filterFood"]),
    selected(food) {
      this.$router.push(`/food/${food._id}`);
    },
    handleType(q) {
      this.searchFood({ query: this.query });
    },
    switchLocation(location) {
      this.location = location;
      this.filterFood({ location });
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
      query: null,
      location: "Gishushu Canteen"
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

.filter-wrapper {
  display: flex;
  justify-content: space-around;
}

.filter-drop {
  margin-left: 80px;
  margin-top: 5px;
}
</style>
