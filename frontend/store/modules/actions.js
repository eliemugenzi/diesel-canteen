import {
  ADDED_FOOD,
  ADDING_FOOD,
  ADD_FOOD_FAIL,
  GETTING_DRINKS,
  GETTING_FOOD,
  GETTING_SINGLE_FOOD,
  GET_DRINKS_FAIL,
  GET_FOOD_FAIL,
  GOT_DRINKS,
  GOT_FOOD,
  LOGGED_IN,
  LOGGING_IN,
  LOGIN_FAILED,
  LOST_SINGLE_FOOD,
  SIGNED_UP,
  SIGNING_UP,
  SIGNUP_FAILED,
  GOT_SINGLE_FOOD,
  PLACING_ORDER,
  PLACE_ORDER_FAIL,
  PLACED_ORDER,
  LOG_OUT,
  SEARCHING,
  SEARCH_FAILED,
  SEARCH_DONE,
  SEARCH_CLEAR,
  CLEAR_ORDER
} from "./mutation-types";
import axios from "../../config/axios";
import {
  filterFood,
  placeOrder,
  searchFood
} from "../../../src/resources/food/food.controller";
export default {
  async login({ commit }, { data, context }) {
    commit(LOGGING_IN);

    try {
      const { data: response } = await axios.post("/auth/login", data);
      commit(LOGGED_IN, response?.data);
      localStorage.setItem("JWT_TOKEN", response?.data?.token);

      axios.defaults.headers.Authorization = `JWT ${response?.data?.token}`;

      context.$router.push("/food");
    } catch (error) {
      commit(LOGIN_FAILED, error?.response?.data?.message);
    }
  },
  async signUp({ commit }, { data, context }) {
    commit(SIGNING_UP);

    try {
      const { data: response } = await axios.post("/auth/signup", data);

      localStorage.setItem("JWT_TOKEN", response?.data?.token);
      axios.defaults.headers.Authorization = `JWT ${response?.data?.token}`;
      commit(SIGNED_UP, response);

      context.$router.push("/food");
    } catch (error) {
      commit(SIGNUP_FAILED, error?.response?.data?.message);
    }
  },
  async getFoods({ commit }, { type }) {
    const LOADING = type === "food" ? GETTING_FOOD : GETTING_DRINKS;
    const DONE = type === "food" ? GOT_FOOD : GOT_DRINKS;
    const FAILED = type === "food" ? GET_FOOD_FAIL : GET_DRINKS_FAIL;

    commit(LOADING);

    try {
      const { data: response } = await axios.get(`/food?type=${type}`);
      commit(DONE, response?.data);
    } catch (error) {
      commit(FAILED, error?.response?.data?.message);
    }
  },
  async addFood({ commit }, { data, context }) {
    commit(ADDING_FOOD);

    try {
      const { data: response } = await axios.post("/food", data);

      commit(ADDED_FOOD, response);

      context?.$router?.push("/food");
    } catch (error) {
      commit(ADD_FOOD_FAIL, error?.response?.data?.message);
    }
  },
  async getSingleFood({ commit }, { id }) {
    commit(GETTING_SINGLE_FOOD);

    try {
      const { data: response } = await axios.get(`/food/${id}`);
      commit(GOT_SINGLE_FOOD, response?.data);
    } catch (error) {
      console.log({ error });
      commit(LOST_SINGLE_FOOD, error?.response?.data?.message);
    }
  },
  async placeOrder({ commit }, { data, id, context }) {
    commit(PLACING_ORDER);

    try {
      const { data: response } = await axios.post(`/food/${id}/order`, data);

      commit(PLACED_ORDER, response);
      context.$notification.success({
        message: "Success",
        description: "Order has been placed"
      });
    } catch (error) {
      commit(PLACE_ORDER_FAIL, error?.response?.data?.message);

      context.$notification.error({
        message: "Error",
        description: error?.response?.data?.message
      });
    }
  },
  logOut({ commit },{context}) {
    console.log(context)
    commit(LOG_OUT);
    context.$router.push("/")
  },
  async searchFood({ commit }, { query }) {
    commit(SEARCHING);

    try {
      const { data: response } = await axios.get(`/food/search?q=${query}`);
      commit(GOT_FOOD, response?.data?.food);
      commit(GOT_DRINKS, response?.data?.drinks);
    } catch (error) {
      commit(SEARCH_FAILED, error?.response?.data?.message);
    }
  },
  clearSearch({ commit }) {
    commit(SEARCH_CLEAR);
  },
  async filterFood({ commit }, { location }) {
    commit(SEARCHING);
    try {
      const { data: response } = await axios.get(
        `/food/filter?location=${location}`
      );
      commit(GOT_FOOD, response?.data?.foods);
      commit(GOT_DRINKS, response?.data?.drinks);
    } catch (error) {
      commit(SEARCH_FAILED, error?.response?.data?.message);
    }
  },
  clearOrder({ commit }) {
    commit(CLEAR_ORDER);
  }
};
