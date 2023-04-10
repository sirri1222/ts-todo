import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// firebase 관련
import { fireDB, auth } from "../firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";

import moment from "moment";

export type TodoType = {
  uid: string;
  title: string;
  body: string;
  done: boolean;
  sticker: string;
  date: string;
};
// 초기 값 타입 정의
export type TodoState = {
  todoList: Array<TodoType>;
};
// store 의 state 의 초기값 셋팅
const initialState: TodoState = {
  todoList: [],
};
export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    initTodoState: (state, action: PayloadAction<Array<TodoType>>) => {
      state.todoList = action.payload;
    },
    addTodoState: (state, action: PayloadAction<TodoType>) => {
      state.todoList.push(action.payload);
    },
    updateTodoState: (state, action: PayloadAction<TodoType>) => {
      const index = state.todoList.findIndex(
        (item) => item.uid === action.payload.uid
      );
      state.todoList[index].title = action.payload.title;
      state.todoList[index].body = action.payload.body;
      state.todoList[index].date = moment(action.payload.date).format(
        "YYYY-MM-DD"
      );
      state.todoList[index].sticker = action.payload.sticker;
      state.todoList[index].done = action.payload.done;
      //   state.todoList[index] = { ...action.payload };
    },
    deleteTodoState: (state, action: PayloadAction<TodoType>) => {
      const index = state.todoList.findIndex(
        (item) => item.uid === action.payload.uid
      );
      state.todoList.splice(index, 1);
    },
    sortTodoState: (state, action: PayloadAction<string>) => {},
    clearTodoState: (state) => {
      state.todoList = [];
    },
  },
});

export const {
  initTodoState,
  addTodoState,
  updateTodoState,
  deleteTodoState,
  sortTodoState,
  clearTodoState,
} = todoSlice.actions;
export default todoSlice.reducer;