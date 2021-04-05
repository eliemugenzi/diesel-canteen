import {
  ADDED_FOOD,
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
  SIGNUP_FAILED,
  ADDING_FOOD,
  ADD_FOOD_FAIL,
  GETTING_SINGLE_FOOD,
  GOT_SINGLE_FOOD,
  LOST_SINGLE_FOOD
} from "./mutation-types";

export default {
  [LOGGING_IN]: state => {
    state.login = {
      ...state.login,
      loading: true,
      error: null,
      data: {}
    };
  },
  [LOGIN_FAILED]: (state, payload) => {
    state.login = {
      ...state.login,
      loading: false,
      data: {},
      error: payload
    };
  },
  [LOGGED_IN]: (state, payload) => {
    state.login = {
      ...state.login,
      loading: false,
      data: payload,
      error: null
    };

    state.user = {
      ...state.user,
      data: payload,
      isLoggedIn: true
    };
  },
  [SIGNING_UP]: state => {
    state.signUp = {
      ...state.signUp,
      loading: true,
      message: null,
      data: {},
      error: null
    };
  },
  [SIGNED_UP]: (state, payload) => {
    state.signUp = {
      ...state.signUp,
      loading: false,
      message: "User has been successfully created",
      data: payload,
      error: null
    };

    state.user = {
      ...state.user,
      data: payload.data,
      isLoggedIn: true
    };
  },
  [SIGNUP_FAILED]: (state, payload) => {
    state.signUp = {
      ...state.signUp,
      loading: false,
      data: {},
      message: null,
      error: payload
    };
  },
  [GETTING_FOOD]: state => {
    state.food = {
      ...state.food,
      loading: true,
      data: [],
      error: null
    };
  },
  [GOT_FOOD]: (state, payload) => {
    state.food = {
      ...state.food,
      loading: false,
      data: payload,
      error: null
    };
  },
  [GET_FOOD_FAIL]: (state, payload) => {
    state.food = {
      ...state.food,
      loading: false,
      data: [],
      error: payload
    };
  },
  [GETTING_DRINKS]: state => {
    state.drinks = {
      ...state.drinks,
      loading: true,
      data: [],
      error: null
    };
  },
  [GOT_DRINKS]: (state, payload) => {
    state.drinks = {
      ...state.drinks,
      loading: false,
      data: payload,
      error: null
    };
  },
  [GET_DRINKS_FAIL]: (state, payload) => {
    state.drinks = {
      ...state.drinks,
      loading: false,
      data: [],
      error: payload
    };
  },
  [ADDING_FOOD]: state => {
    state.newItem = {
      ...state.newItem,
      loading: true,
      data: {},
      error: null,
      message: null
    };
  },
  [ADDED_FOOD]: (state, payload) => {
    state.newItem = {
      ...state.newItem,
      loading: false,
      error: null,
      data: payload,
      message: "New Item has been added"
    };
  },
  [ADD_FOOD_FAIL]: (state, payload) => {
    state.newItem = {
      ...state.newItem,
      loading: false,
      data: {},
      error: payload,
      message: null
    };
  },
  [GETTING_SINGLE_FOOD]: state => {
    state.singleFood = {
      ...state.singleFood,
      loading: true,
      data: {},
      error: null
    };
  },
  [GOT_SINGLE_FOOD]: (state, payload) => {
    state.singleFood = {
      ...state.singleFood,
      loading: false,
      data: payload,
      error: null
    };
  },
  [LOST_SINGLE_FOOD]: (state, payload) => {
    state.singleFood = {
      ...state.singleFood,
      loading: false,
      data: {},
      error: payload
    };
  }
};
