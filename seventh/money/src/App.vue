<template>
  <div class="wrapper">
    <h1>Калькулятор стоимости покупки в разных валютах</h1>
    
    <label for="amount">Сумма покупки (в базовой валюте):</label>
    <input type="number" v-model="amount" id="amount" placeholder="Введите сумму" />

    <label for="currency">Выберите валюту:</label>
    <select v-model="selectedCurrency" id="currency">
      <option value="USD">Доллар США</option>
      <option value="EUR">Евро</option>
      <option value="GBP">Фунт стерлингов</option>
      <option value="RUB">Российские рубли</option>
    </select>

    <button @click="convertCurrency" :disabled="!amount">Конвертировать</button>

    <p v-if="convertedAmount !== null">Сумма в выбранной валюте: {{ convertedAmount }} {{ selectedCurrency }}</p>
    <p class="error" v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      amount: "", // Сумма покупки в базовой валюте
      selectedCurrency: "USD", // Выбранная валюта
      convertedAmount: null, // Конвертированная сумма
      error: "", // Сообщения об ошибках
    };
  },
  methods: {
    async convertCurrency() {
      this.error = ""; // Сбрасываем ошибки перед новым запросом
      if (!this.amount || this.amount <= 0) {
        this.error = "Введите правильную сумму.";
        return;
      }

      try {
        // API ключ
        const apiKey = "3618a9714708baaf1c14f498"; 
        const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`; // Получаем курсы относительно USD
        const response = await axios.get(url);

        // Проверяем, есть ли данные о нужной валюте
        const exchangeRate = response.data.conversion_rates[this.selectedCurrency];

        if (!exchangeRate) {
          this.error = "Не удалось получить курс для выбранной валюты.";
          return;
        }

        // Конвертируем сумму
        this.convertedAmount = (this.amount * exchangeRate).toFixed(2);
      } catch (error) {
        this.error = "Ошибка при получении данных о курсах валют.";
      }
    },
  },
};
</script>

<style scoped>
.wrapper {
  width: 400px;
  margin: 0 auto;
  text-align: center;
  padding: 20px;
  background: #f1f1f1;
  border-radius: 10px;
}

input, select, option {
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  color: white;
}

button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
}

.error {
  color: red;
}

h1, p, button, label {
  color: black; 
}

</style>
