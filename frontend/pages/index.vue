<template>
  <main class="wrapper">
    <a-card class="container" hoverable>
      <h2 class="title">Login</h2>
      <a-alert
        v-if="!!loginError"
        type="error"
        closable
        :description="loginError"
        class="error-message"
      ></a-alert>
      <a-form
        class="form"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
        :form="form"
        @submit.prevent="handleSubmit"
      >
        <a-form-item label="Login ID" class="input">
          <a-input
            v-model="state.login_id"
            v-decorator="[
              'login_id',
              { rules: [{ required: true, message: 'Login ID is required' }] }
            ]"
          ></a-input>
        </a-form-item>
        <a-form-item label="Password" class="input">
          <a-input-password v-model="state.password"></a-input-password>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button
            type="primary"
            html-type="submit"
            block
            class="button"
            :loading="loggingIn"
            >Login</a-button
          >
        </a-form-item>
      </a-form>
    </a-card>
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: function() {
    return {
      form: this.$form.createForm(this, { name: "coordinated" }),
      state: {
        login_id: null,
        password: null
      }
    };
  },
  computed: {
    ...mapGetters(["loggingIn", "loginData", "loginError", "isLoggedIn"])
  },
  methods: {
    ...mapActions(["login"]),
    handleSubmit() {
      const payload = this.state;
      this.login({ data: payload, context: this });
    }
  },
  beforeMount() {
    if (this.isLoggedIn) {
      this.$router.push("/food");
    }
  }
};
</script>

<style>
.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
.wrapper {
  display: grid;
  place-content: center;
  height: 100vh;
  width: 100vw;
}
.form {
  min-width: 300px;
}

.input {
  width: 30vw;
}

.button {
  background: #0a4d98;
}

.title {
  text-align: center;
  margin-bottom: 20px;
}

.error-message {
  margin: 20px auto;
}
</style>
