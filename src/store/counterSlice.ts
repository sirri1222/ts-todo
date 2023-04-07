import { createSlice } from "@reduxjs/toolkit";
// action :  함수로서 store의 state 를 업데이트한다.
import type { PayloadAction } from "@reduxjs/toolkit";

// 초기 값 타입 정의
// export interface CounterState  {
//   value: number;
// };
export type CounterState = {
  value: number;
};
// store 의 state 의 초기값 셋팅
const initialState: CounterState = {
  value: 0,
};
// 실제 활용할 slice 생성함.
export const counterSlice = createSlice({
  // slice 의 이름
  name: "counter",
  // slice 의 초깃값
  //   initialState: initialState,
  initialState,
  // 리듀서들을 배치함
  reducers: {
    // 더하기 액션
    increment: (state) => {
      state.value += 1;
    },
    // 빼기 액션
    decrement: (state) => {
      state.value -= 1;
    },
    // 일정한 수 만큼 증감
    // action:PayloadAction<T>
    incrementByAmout: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

// 액션을 내보낸다.
export const { increment, decrement, incrementByAmout } = counterSlice.actions;
// slice의 reducer 를 내보낸다.
export default counterSlice.reducer;