<template>
  <main>
    <div class="logo">
      <img src="../assets/diesel-logo.png" alt="Diesel" class="logo" />
    </div>
    <div class="menu">
      <a-dropdown class="dropdown">
        <a @click="e => e.preventDefault()" class="ant-dropdown-link"
          >20001 <a-icon type="down"></a-icon>
        </a>
        <a-menu slot="overlay">
          <a-menu-item>
            <a href="javascript:;">Log Out</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </main>
</template>

<script>
export default {
  name: "Header"
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
</style>
