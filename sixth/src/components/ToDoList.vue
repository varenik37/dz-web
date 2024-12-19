<template>
    <div>
      <AddTask @add-task="addTask" />
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Описание</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <TaskItem 
            v-for="task in tasks" 
            :key="task.id" 
            :task="task" 
            @delete-task="deleteTask"
          />
        </tbody>
      </table>
    </div>
  </template>
  
  <script>

  
  export default {
    data() {
      return {
        tasks: []
      };
    },
    methods: {
      addTask(taskName) {
        const newTask = {
          id: this.tasks.length + 1,
          name: taskName,
          status: 'Не в работе'
        };
        this.tasks.push(newTask);
      },
      deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
      }
    }
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  th, td {
    text-align: left;
    padding: 10px;
    border: 1px solid #ddd;
  }
  
  th {
    background-color: #f4f4f4;
  }
  
  td select {
    padding: 5px;
  }
  </style>
  