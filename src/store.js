import { createStore } from "vuex";
import { createApp } from "vue";

const app = createApp({});
export const Vue = app;

const store = createStore({
  state: {
    todos: [],
  },
  mutations: {
    addTodo(state, todo) {
      state.todos.push(todo);
    },
    deleteTodo(state, index) {
      state.todos.splice(index, 1);
    },
  },
});

export default store;
