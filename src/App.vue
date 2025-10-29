<script setup></script>

<template>
  <header class="app-header">
    <h1>Form de cadastro de endereço</h1>
  </header>
  <main>
    <div class="form-wrapper">
      <form action="" class="form-container">
        <div class="form-group">
          <label for="cep">CEP:</label>
          <input type="text" id="cep" v-model="cep" @blur="searchCep" />
          <span class="error-message" v-if="showCepError">O CEP digitado não existe</span>
        </div>
        <div class="form-group">
          <label for="street">Rua:</label>
          <input type="text" id="street" v-model="street" />
        </div>
        <div class="form-group">
          <label for="number">Número:</label>
          <input type="text" id="number" v-model="number" />
        </div>
        <div class="form-group">
          <label for="neighborhood">Bairro:</label>
          <input type="text" id="neighborhood" v-model="neighborhood" />
        </div>
        <div class="form-group">
          <label for="city">Cidade:</label>
          <input type="text" id="city" v-model="city" />
        </div>
        <div class="form-group">
          <label for="state">Estado:</label>
          <input type="text" id="state" v-model="state" />
        </div>
        <button type="submit" class="btn">Cadastrar Endereço</button>
      </form>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import searchCepApi from "./api/cep.js";

const cep = ref("");
const street = ref("");
const number = ref("");
const neighborhood = ref("");
const city = ref("");
const state = ref("");
const loading = ref(false);
const showCepError = ref(false);
const cepNotFound = ref(false);

const searchCep = async () => {
  loading.value = true;
  if (cep.value.length !== 8) {
    showCepError.value = true;
    return;
  }

  try {
    const data = await searchCepApi(cep.value);
    street.value = data.logradouro || "";
    neighborhood.value = data.bairro || "";
    city.value = data.localidade || "";
    state.value = data.uf || "";
  } catch (error) {
    cepNotFound.value = true;
    console.error(error);
  } fi
  
};

</script>


<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

.app-header {
  background-color: #42b983;
  color: white;
  padding: 1rem;
  text-align: center;
  width: 100%;
}

.form-wrapper {
  max-width: 40rem;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.form-container {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}

.form-group {
  margin-bottom: 1rem;
  width: 100%;
  padding: 0 0.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.25rem;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box;
}

.btn {
  background-color: #42b983;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 1rem;
  margin: 1rem auto 0;
}

.error-message {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

@media (min-width: 762px) {
  .form-wrapper {
    margin: 1rem auto;
    padding: 1.5rem;
  }

  .form-group {
    width: 50%;
  }
}
</style>
