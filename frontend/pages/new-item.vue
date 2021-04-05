<template>
  <main class="new-item">
    <a-card hoverable>
      <h2 class="title">Add item to stock</h2>
      <a-alert
        v-if="addFoodError"
        type="error"
        :description="addFoodError"
        closable
        class="error-message"
      ></a-alert>
      <a-alert
        v-if="!!addedFoodMsg"
        type="success"
        :description="addedFoodMsg"
        closable
        class="error-message"
      ></a-alert>
      <a-form
        class="form"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
        layout="vertical"
        @submit.prevent="handleSubmit"
      >
        <a-form-item label="Item Name" class="input">
          <a-input v-model="state.name"></a-input>
        </a-form-item>
        <a-form-item label="Item Price(Rwf)" class="input">
          <a-input v-model="state.price"></a-input>
        </a-form-item>
        <a-form-item label="Description" class="input">
          <a-textarea :rows="4" v-model="state.description"></a-textarea>
        </a-form-item>
        <a-form-item class="upload-item" label="Image">
          <a-upload list-type="picture-card" @change="handleChange">
            <div>
              <a-icon type="plus"></a-icon>
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item label="Type">
          <a-select
            label-in-value
            @change="handleType"
            :default-value="{ key: 'food' }"
          >
            <a-select-option value="food">Food</a-select-option>
            <a-select-option value="drink">Drink</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Quantity">
          <a-input-number
            :min="1"
            :max="1000"
            :default-value="1"
            @change="onQuantityChange"
          ></a-input-number>
        </a-form-item>
        <a-form-item label="Location">
          <a-select
            label-in-value
            @change="handleLocChange"
            :default-value="{ key: 'Gishushu Canteen' }"
          >
            <a-select-option value="Gishushu Canteen"
              >Gishushu Canteen</a-select-option
            >
            <a-select-option value="Masoro Canteen"
              >Masoro Canteen</a-select-option
            >
          </a-select>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button
            type="primary"
            block
            class="button"
            html-type="submit"
            :loading="addingFood"
            >Add Item</a-button
          >
        </a-form-item>
      </a-form>
    </a-card>
  </main>
</template>

<script>
import { ref, reactive, computed, onBeforeMount } from "@vue/composition-api";
import firebase from "../config/firebase";
import useStore from "../store";
export default {
  setup(ctx) {
    const fileList = ref([]);
    const previewVisible = ref(false);
    const previewImage = ref("");
    const imageUrl = ref("");

    const store = useStore();

    const state = reactive({
      name: "",
      price: null,
      description: "",
      image: "",
      type: "food",
      quantity: 1,
      location: "Gishushu Canteen"
    });

    const handleChange = async ({ fileList: files, file }) => {
      fileList.value = files;

      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(`/foods/${file.name}`);

      const fileObj = file.originFileObj;

      const fileUploaded = await imageRef.put(fileObj);

      if (fileUploaded) {
        const fileUrl = await fileUploaded.ref.getDownloadURL();
        imageUrl.value = fileUrl;

        state.image = fileUrl;
      }
    };

    const handleType = value => {
      state.type = value.key;
    };

    const onQuantityChange = value => {
      state.quantity = value;
    };

    const handleLocChange = ({ key }) => {
      state.location = key;
    };

    const handleSubmit = () => {
      store.dispatch("addFood", {
        data: state,
        context: ctx
      });
    };

    const addingFood = computed(() => store.getters.addingFood);
    const addFoodError = computed(() => store.getters.addFoodError);
    const addedFoodMsg = computed(() => store.getters.addedFood);

    return {
      fileList,
      previewVisible,
      previewImage,
      handleChange,
      handleType,
      state,
      onQuantityChange,
      handleLocChange,
      handleSubmit,
      addingFood,
      addFoodError,
      addedFoodMsg
    };
  }
};
</script>

<style scoped>
.new-item {
  display: grid;
  place-content: center;
  height: 100vh;
  width: 100vw;
}

.input {
  width: 30vw;
}

.title {
  text-align: center;
  margin-bottom: 20px;
}

.upload-input {
  position: relative;
  width: 100%;
}

.button {
  background: #0a4d98;
}

.error-message {
  margin: 20px auto;
}
</style>
