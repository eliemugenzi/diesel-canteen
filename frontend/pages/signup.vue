<template>
  <main class="signup">
    <a-card hoverable>
      <h2 class="title">Sign Up</h2>
      <a-alert
        v-if="!!signUpError"
        type="error"
        class="error-message"
        :description="signUpError"
        closable
      ></a-alert>
      <a-form
        class="form"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
        @submit.prevent="handleSubmit"
      >
        <a-form-item class="input" label="Login ID">
          <a-input v-model="state.login_id"></a-input>
        </a-form-item>
        <a-form-item class="input" label="Names">
          <a-input v-model="state.name"></a-input>
        </a-form-item>
        <a-form-item class="input" label="Password">
          <a-input type="password" v-model="state.password"></a-input>
        </a-form-item>
        <a-form-item class="input" label="Confirm Password">
          <a-input type="password" v-model="state.confirm_password"></a-input>
        </a-form-item>
        <a-form-item label="Sign Up As">
          <a-select
            label-in-value
            @change="handleChange"
            :default-value="{ key: 'student' }"
          >
            <a-select-option value="student">Student</a-select-option>
            <a-select-option value="admin">Admin</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button
            type="primary"
            html-type="submit"
            block
            class="button"
            :loading="creatingAcc"
            >Sign Up</a-button
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
      state: {
        login_id: null,
        name: null,
        password: null,
        confirm_password: null,
        type: "student"
      },
      error: null
    };
  },
  methods: {
    ...mapActions(["signUp"]),
    handleChange(value) {
      console.log({ value });
      this.state.type = value.key;
    },
    handleSubmit() {
      console.log("SUBMIT");
      if (this.state.password !== this.state.confirm_password) {
        this.error = "Password must match!";

        return;
      }

      const payload = {
        ...this.state,
        confirm_password: undefined
      };

      this.signUp({ data: payload, context: this });
    }
  },
  computed: {
    ...mapGetters(["creatingAcc", "signUpError"])
  }
};
</script>

<style scoped>
.signup {
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
