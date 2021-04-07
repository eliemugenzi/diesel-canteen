<template>
  <main>
    <div class="logo">
      <nuxt-link :to="`${isLoggedIn ? '/food' : '/'}`">
        <img src="../assets/diesel-logo.png" alt="Diesel" class="logo" />
      </nuxt-link>
    </div>
    <div class="menu">
      <a-dropdown class="dropdown" v-if="isLoggedIn">
        <a @click="e => e.preventDefault()" class="ant-dropdown-link"
          >{{ currentUser.login_id }} <a-icon type="down"></a-icon>
        </a>
        <a-menu slot="overlay">
          <a-menu-item>
            <a href="javascript:;" @click="handleLogOut">Log Out</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
      <div class="menu-list" v-else>
        <a-button @click="$router.push('/')">Login</a-button>
        <a-button type="primary" @click="$router.push('/signup')" class="button"
          >Sign Up</a-button
        >
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Header",
  computed: {
    ...mapGetters(["isLoggedIn", "currentUser"])
  },
  methods: {
    handleLogOut() {
      this.logOut();
    },
    ...mapActions(["logOut"])
  }
};
</script>

<style scoped>
main {
  display: flex;
  justify-content: space-between;
  margin: 30px 10%;
}

.dropdown {
  background: #0a4d98;
  padding: 5px;
  color: white;
}

.dropdown a.ant-dropdown-link {
  color: white !important;
}

.logo {
  box-sizing: border-box;
}

.button {
  background: #0a4d98;
}
</style>
