<template>
    <div class="wrapper">
      <h1>Погодное приложение</h1>
  
      <!-- Ввод города и кнопка для получения погоды -->
      <p>Узнать погоду в {{ city == "" ? "вашем городе" : cityName }}</p>
      <input type="text" v-model="city" placeholder="Введите город">
      <button v-if="city != ''" @click="getWeather()">Получить погоду</button>
      <button disabled v-else>Введите название города</button>
      <p class="error">{{ error }}</p>
  
      <!-- Информация о погоде в городе -->
      <div v-if="info != null">
        <p>{{ showTemp }}</p>
        <p>{{ showFeelsLike }}</p>
        <p>{{ showMinTemp }}</p>
        <p>{{ showMaxTemp }}</p>
      </div>
  
      <!-- Выбор региона и получение средней температуры -->
      <h2>Средняя температура в регионе</h2>
      <label for="region">Выберите регион:</label>
      <select v-model="selectedRegion" id="region">
        <option value="europe">Европа</option>
        <option value="asia">Азия</option>
        <option value="america">Америка</option>
      </select>
      <button @click="getRegionWeather">Узнать среднюю температуру</button>
  
      <!-- Средняя температура в выбранном регионе -->
      <div v-if="regionAverageTemp !== null">
        <p>Средняя температура в регионе: {{ regionAverageTemp }}°C</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        city: "", // Название города
        error: "", // Сообщение об ошибке
        info: null, // Погодная информация по городу
        selectedRegion: "europe", // Выбранный регион
        regionAverageTemp: null, // Средняя температура в регионе
        regionCities: {
          europe: ["London", "Paris", "Berlin"],
          asia: ["Tokyo", "Seoul", "Bangkok"],
          america: ["New York", "Los Angeles", "Mexico City"],
        }, // Города для каждого региона
      };
    },
    computed: {
      cityName() {
        return "«" + this.city + "»";
      },
      showTemp() {
        return "Температура: " + this.info.main.temp;
      },
      showFeelsLike() {
        return "Ощущается как: " + this.info.main.feels_like;
      },
      showMinTemp() {
        return "Минимальная температура: " + this.info.main.temp_min;
      },
      showMaxTemp() {
        return "Максимальная температура: " + this.info.main.temp_max;
      },
    },
    methods: {
      async getWeather() {
        if (this.city.trim().length < 2) {
          this.error = "Нужно название более одного символа :)";
          return false;
        }
  
        this.error = "";
  
        try {
          const apiKey = "0ba39c23e0dd0a5b63ccdd6354473356";
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=${apiKey}`
          );
          this.info = response.data;
        } catch {
          this.error = "Не удалось получить данные о погоде.";
        }
      },
  
      async getRegionWeather() {
        this.error = "";
        this.regionAverageTemp = null;
  
        const cities = this.regionCities[this.selectedRegion];
        if (!cities || cities.length === 0) {
          this.error = "Для данного региона нет данных.";
          return;
        }
  
        try {
          const apiKey = "0ba39c23e0dd0a5b63ccdd6354473356";
          const promises = cities.map((city) =>
            axios.get(
              `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
            )
          );
  
          const results = await Promise.all(promises);
          const temperatures = results.map((res) => res.data.main.temp);
          const averageTemp =
            temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length;
  
          this.regionAverageTemp = averageTemp.toFixed(2);
        } catch {
          this.error = "Не удалось получить данные о погоде в регионе.";
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

/* Добавляем отступы между секциями */
.wrapper h1, .wrapper h2, .wrapper p, .wrapper label, .wrapper select, .wrapper button, .wrapper input {
  margin-bottom: 15px;
}

input, select, option {
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
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

h1, h2, p, label {
  color: black;
}
</style>