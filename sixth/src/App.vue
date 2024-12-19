<template>
    <div id="app">
      <h1>Список дел</h1>
  
      <!-- Форма для добавления нового дела -->
      <div class="task-form">
        <input v-model="taskName" placeholder="Описание дела" />
        <button @click="addTask">Добавить дело</button>
        <p v-if="error" style="color: red;">{{ error }}</p>
      </div>
  
      <!-- Список дел -->
      <div class="task-list">
        <h2>Мои дела</h2>
        <ul>
          <li v-for="(task, index) in tasks" :key="task.id">
            <span :class="{ done: task.status === 'Выполнено' }">{{ task.name }}</span>
            <select v-model="task.status" @change="updateTaskStatus(index)">
              <option value="Не в работе">Не в работе</option>
              <option value="В процессе">В процессе</option>
              <option value="Выполнено">Выполнено</option>
            </select>
            <button @click="deleteTask(index)">Удалить</button>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        tasks: [],
        taskName: '',
        error: ''
      };
    },
    methods: {
      // Метод для добавления нового дела
      addTask() {
        if (this.taskName === '') {
          this.error = 'Описание дела не введено';
          return;
        }
  
        // Добавление нового дела в массив
        const newTask = {
          id: this.tasks.length + 1,
          name: this.taskName,
          status: 'Не в работе'
        };
        this.tasks.push(newTask);
        this.taskName = ''; // Очищаем поле ввода
        this.error = ''; // Сбрасываем ошибку
      },
  
      // Метод для удаления дела
      deleteTask(index) {
        this.tasks.splice(index, 1);
      },
  
      // Метод для обновления статуса дела
      updateTaskStatus(index) {
      }
    }
  };
  </script>
  
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 20px;
  }
  
  h1 {
    color: #007bff;
    margin-bottom: 20px;
  }
  
  .task-form {
    display: flex;
    justify-content: space-between; /* Распределяет элементы по ширине */
    margin-bottom: 20px;
  }
  
  .task-form input {
    flex-grow: 1; /* Позволяет полям ввода расширяться */
    margin-right: 10px; /* Расстояние между полями */
    padding: 8px;
  }
  
  .task-form button {
    padding: 8px 16px;
  }
  
  .task-list {
    margin-top: 20px;
  }
  
  .task-list ul {
    list-style-type: none;
    padding: 0;
  }
  
  .task-list li {
    display: flex;
    justify-content: space-between; /* Распределяет элементы по ширине */
    align-items: center; /* Выравнивает элементы по вертикали */
    margin-bottom: 10px;
  }
  
  .task-list li span {
    flex-grow: 1; /* Позволяет названию задачи расширяться */
  }
  
  .task-list button {
    background-color: red;
    color: white;
    border: none;
    padding: 5px 10px;
  }
  
  .task-list button:hover {
    background-color: darkred;
  }
  
  .done {
    text-decoration: line-through;
    color: green;
  }
  
  .task-list select {
    padding: 5px;
  }
  </style>
  