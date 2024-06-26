import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid';
export const useTaskStore = defineStore('task', {
  state: () => ({
    taskList: []
  }),
  actions: {
    addTask(task) {
      this.taskList.push({
        id: uuidv4(),
        text: task,
        completed: false
      })
    },
    deleteTask(index){
      console.log(index)
      this.taskList.splice(index,1)
      console.log('Updated taskList:', this.taskList)
    }
  },
  persist: {
    enabled:true,
    strategies:[
      {
        key:'todo',
        storage:localStorage
      }
    ]
  }
})
