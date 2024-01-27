<template>
  <div class="box">
    <p>
      <span class="currentDate">{{ currentDate }}</span>
      <br />
      <img class="imgList" src="./assets/img/list.png" />
      TodoList...
    </p>
    <input type="text" v-model="newTodo" @keyup.enter="addTodo" placeholder="type..." />
    <ul>
      <li v-for="(todo, index) in todos" :key="index">
        <label>
          <input type="checkbox" v-model="todos[index].completed" />
          <span :style="todoStyles(index)">
            <img :src="getImagePath(index)" class="imgCheck" />
            {{ todo.text }}
          </span>
        </label>
        <button @click="deleteTodo(index)">
          <img src="./assets/img/trash.png" class="del" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      newTodo: ""
    };
  },
  computed: {
    ...mapState(["todos"]),
    currentDate() {
      const today = new Date();
      const options = { year: "numeric", month: "long", day: "numeric" };
      return today.toLocaleDateString("en-US", options);
    },
    todoStyles() {
      return index => ({
        "text-decoration": this.todos[index].completed
          ? "line-through"
          : "none",
        color: this.todos[index].completed ? "steelblue" : "white"
        // transition: "1s"
      });
    }
  },
  methods: {
    ...mapMutations(["addTodo", "deleteTodo"]),
    addTodo() {
      if (this.newTodo.trim() !== "") {
        this.$store.commit("addTodo", {
          text: this.newTodo.trim(),
          completed: false
        });
        this.newTodo = "";
      }
    },
    deleteTodo(index) {
      this.$store.commit("deleteTodo", index);
    },
    getImagePath(index) {
      const uncheck = require("@/assets/img/circle.png");
      const check = require("@/assets/img/smile.png");

      return this.todos[index].completed ? check : uncheck;
    }
  }
};
</script>

<style>
@import url("./assets/style.css");
</style>