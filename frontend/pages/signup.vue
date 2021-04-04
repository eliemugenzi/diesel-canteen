<template>
  <main class="signup">
    <a-card hoverable>
      <h2 class="title">Sign Up</h2>
      <a-form class="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-form-item class="input" label="Login ID">
          <a-input></a-input>
        </a-form-item>
        <a-form-item class="input" label="Student Names">
          <a-input></a-input>
        </a-form-item>
        <a-form-item class="input" label="Password">
          <a-input type="password"></a-input>
        </a-form-item>
        <a-form-item class="input" label="Confirm Password">
          <a-input type="password"></a-input>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" html-type="submit" block class="button"
            >Sign Up</a-button
          >
        </a-form-item>
      </a-form>
    </a-card>
  </main>
</template>

<script>
export default {};
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
</style>
