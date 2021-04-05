export default {
  loginData: state => state.login.data,
  loggingIn: state => state.login.loading,
  loginError: state => state.login.error,
  creatingAcc: state => state.signUp.loading,
  signUpError: state => state.signUp.error,
  signUpSuccess: state => state.signUp.message,
  currentUser: state => state.user.data,
  isLoggedIn: state => state.user.isLoggedIn,
  gettingFood: state => state.food.loading,
  gettingDrinks: state => state.drinks.loading,
  foodList: state => state.food.data,
  drinkList: state => state.drinks.data,
  addingFood: state => state.newItem.loading,
  addFoodError: state => state.newItem.error,
  addedFood: state => state.newItem.message
};
