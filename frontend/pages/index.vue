<template>
  <main class="wrapper">
    <a-card class="container" hoverable>
      <h2 class="title">Login</h2>
      <a-form
        class="form"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
        :form="form"
      >
        <a-form-item label="Login ID" class="input">
          <a-input></a-input>
        </a-form-item>
        <a-form-item label="Password" class="input">
          <a-input type="password"></a-input>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" html-type="submit" block class="button"
            >Login</a-button
          >
        </a-form-item>
      </a-form>
    </a-card>
  </main>
</template>

<script>
export default {
  data: function() {
    return {
      form: this.$form.createForm(this, { name: "coordinated" })
    };
  }
};
</script>

<style>
.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

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
</style>
