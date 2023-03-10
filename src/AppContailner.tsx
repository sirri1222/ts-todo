import { useEffect, useState } from "react";
// 상태관리를 위한 객체복사 라이브러리
import produce from "immer";
import App from "./App";
import moment from "moment";
export type TodoType = {
  uid: string;
  title: string;
  body: string;
  done: boolean;
  sticker: string;
  date: string;
};
// 상태를 변경하는 함수를 묶어서 타입으로 정의해 볼까?

// 꼭 타입으로 정의해서 진행하지 않으셔도 됩니다.
// 즉, 처음부터 최적화를 하는 것은 좋지않은 거 같더군요.
// 나 혼자 관리하는 개발을 주도 : 타입정의하는것 좋다.

// 타인과 개발한다 : 쪼금 생각을 해야 한다.
// 단점 : 타인이 Type에 대한 구성을 파악하는 시간 소비
//        타인이 Type에 학습을 해야 한다.
// 더 큰 장점 : 오류가 줄어든다(오타, 오류를 줄인다. 안정성)
export type CallBacksType = {
  addTodo: (
    uid: string,
    title: string,
    body: string,
    done: boolean,
    sticker: string,
    date: string
  ) => void;
  updateTodo: (todo: TodoType) => void;
  deleteTodo: (todo: TodoType) => void;
  sortTodo: (sortType: string) => void;
};
export type StatesType = {
  todoList: Array<TodoType>;
};

const AppContainer = () => {
  // 상태데이터
  let initData: Array<TodoType> = [];
  // 로컬스토리지 이름
  const localStorageName = "tstodo";
  // 로컬스토리지 활용
  const getLocalData = () => {
    const data = localStorage.getItem(localStorageName);
    console.log("localStorage", data);
    if (data !== null) {
      initData = JSON.parse(data);
      setTodoList(initData);
    }
  };
  useEffect(() => {
    getLocalData();
  }, []);

  // 화면의 내용을 갱신해 주기 위해서 state Hook 사용
  const [todoList, setTodoList] = useState<Array<TodoType>>(initData);
  // 추가기능
  const addTodo = (
    uid: string,
    title: string,
    body: string,
    done: boolean,
    sticker: string,
    date: string
  ) => {
    // 새로운 todoType 생성
    // 기존 todoList state 를 복사하고,
    // 추가 todoList 를 합쳐주고,
    // todoList state 를 업데이트한다.
    // 이때, immutable 을 유지한다.
    // 필수 라이브러리로 Immer 가 있다.
    // Immer 는 객체의 불변성을 유지하는 것으로
    // 업무에서 필수로 활용한다.
    // 즉, {...todoList, newTodo} 를 대신한다.
    let newTodoList = produce(todoList, (draft) => {
      draft.push({
        uid: uid,
        title: title,
        body: body,
        date: date,
        sticker: sticker,
        done: false,
      });
    });
    // state 업데이트 : 화면 갱신
    setTodoList(newTodoList);

    localStorage.setItem(localStorageName, JSON.stringify(newTodoList));
  };
  // 수정기능
  const updateTodo = (todo: TodoType) => {
    // console.log("갱신될 내용 : ", todo);
    // 1. 먼저 uid 를 비교해서 배열의 순서에 맞는 1개를 찾는다.
    const index = todoList.findIndex((item) => item.uid === todo.uid);
    // console.log("갱신될 index : ", index);
    // 2. 해당하는 uid 의 내용을 갱신한다.
    const newTodoList = produce(todoList, (draft) => {
      draft[index] = {
        ...draft[index],
        title: todo.title,
        body: todo.body,
        date: moment(todo.date).format("YYYY-MM-DD"),
        sticker: todo.sticker,
        done: todo.done,
      };
    });
    // 3. state를 업데이트한다.
    setTodoList(newTodoList);

    localStorage.setItem(localStorageName, JSON.stringify(newTodoList));
  };
  // 삭제기능
  const deleteTodo = (todo: TodoType) => {
    let index = todoList.findIndex((item) => todo.uid === item.uid);
    // state 의 목록을 삭제 후 갱신한다. 불변성 라이브러리 (immer) 활용
    // let newTodoList = produce( 대상, (draft) => {})
    let newTodoList = produce(todoList, (draft) => {
      // index 의 순서로 부터 1개를 제거하고
      // 나머지 배열을 리턴한다.
      // 즉, 원본을 복사해서 새로운 배열을 만들고 그 중에 1개를 제거한후
      // 새로운 배열을 리턴하여 state 를 업데이트 한다.
      draft.splice(index, 1);
    });
    setTodoList(newTodoList);
    localStorage.setItem(localStorageName, JSON.stringify(newTodoList));
  };
  // 정렬기능
  const sortTodo = (sortType: string) => {};
  // state 관리기능타입
  const callBacks: CallBacksType = {
    addTodo,
    updateTodo,
    deleteTodo,
    sortTodo,
  };

  // 데이터목록의 타입
  const states: StatesType = { todoList };
  return <App states={states} callBacks={callBacks} />;
};

export default AppContainer;