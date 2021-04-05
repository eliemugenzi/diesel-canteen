import {
  ADDED_FOOD,
  ADDING_FOOD,
  ADD_FOOD_FAIL,
  GETTING_DRINKS,
  GETTING_FOOD,
  GET_DRINKS_FAIL,
  GET_FOOD_FAIL,
  GOT_DRINKS,
  GOT_FOOD,
  LOGGED_IN,
  LOGGING_IN,
  LOGIN_FAILED,
  SIGNED_UP,
  SIGNING_UP,
  SIGNUP_FAILED
} from "./mutation-types";
import axios from "../../config/axios";
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
  }
};
