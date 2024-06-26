<script setup>
import { ref, watchEffect } from 'vue'
import { useTaskStore } from "@/stores/task.js"
const taskStore = useTaskStore()
const newTask = ref("")
const addTask = () => {
  console.log(newTask.value)
  taskStore.addTask(newTask.value)
}
const editedTaskText = ref('')
const deleteTask = (id) => {
  console.log(id)
  taskStore.deleteTask(id)
}
const { taskList } = taskStore
const startEditing = (index)=>{
  editedTaskText.value = taskList[index].text
  taskList[index].isEditing = true
}
const finishEditing = (index)=>{
  taskList[index].text = editedTaskText.value
  taskList[index].isEditing = false
}
watchEffect(() => {
  console.log('Current taskList:', taskList)
})
</script>

<template>
  <main>
    <el-input v-model="newTask" style="max-width: 600px" placeholder="Please input new task">
      <template #append>
        <el-button @click="addTask">Add</el-button>
      </template>
    </el-input>
    <ul class="task-list">
      <li v-for="(task, index) in taskList" :key="task.id">
        <template v-if="!task.isEditing">
          {{ index }}. <span @click="startEditing(index)">{{ task.text }}</span>
          <el-icon class="icon" @click="deleteTask(index)">
            <Close />
          </el-icon>
        </template>
        <template v-else>
          <el-input v-model="editedTaskText" style="width: 240px" @blur="finishEditing(index)" @keyup.enter="finishEditing(index)"/>
        </template>
      </li>

    </ul>

  </main>
</template>

<style scoped>
.task-list {
  list-style-type: none;
  padding: 0;
}

.task-list li {
  display: flex;
  align-items: center;
}

.task-list li .icon {
  cursor: pointer;
}
</style>
