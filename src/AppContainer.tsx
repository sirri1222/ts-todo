// store 관련
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "./store/store";
import {
  fbLoginState,
  fbJoinState,
  fbLogoutState,
  fbDeleteUserState,
} from "./store/userSlice";
import {
  initTodoState,
  addTodoState,
  updateTodoState,
  deleteTodoState,
  sortTodoState,
  clearTodoState,
} from "./store/todoSlice";
// firebase 관련
import { fireDB, auth } from "./firebase";

import { useEffect, useState } from "react";
// 상태관리를 위한 객체복사 라이브러리
import produce from "immer";
import App from "./App";
import moment from "moment";
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
  clearTodo?: () => void;
};
export type StatesType = {
  todoList: Array<TodoType>;
};

// 로그인 및 회원가입 타입정의
export type CallBacksFireBaseType = {
  fbLogin: (email: string, password: string) => void;
  fbJoin: (email: string, password: string) => void;
  fbLogout: () => void;
  fbDeleteUser: () => void;
};

const AppContainer = () => {
  // store 코드
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const todo = useSelector((state: RootState) => state.todo);

  // 상태데이터
  let initData: Array<TodoType> = [];
  // 로컬스토리지 이름
  const localStorageName = "tstodo";

  // firebase Storage 이름
  const firebaseStorageName = "tsmemo";
  // 컬렉션(DataBase 단위: MongoDB 참조) 불러오기
  const memoCollectionRef = collection(fireDB, firebaseStorageName);

  // 로컬스토리지 활용 : 파이어베이스로 변경
  const getLocalData = async () => {
    // const data = localStorage.getItem(localStorageName);
    // console.log("localStorage", data);

    const q = await query(memoCollectionRef);
    const data = await getDocs(q);
    // console.log("firebase collection data : ", data);

    if (data !== null) {
      // initData = JSON.parse(data);
      // 모든 데이터 가져와서 뜯기
      // [ {}, {}, {}, ....]
      const firebaseData = data.docs.map((doc) => ({
        ...doc.data(),
      }));
      // firebaseData = [ {}, {}, {}, ....]
      // Array<TodoType> 형태가 아니라서 아래로 변환한다.
      const initData = firebaseData.map((item) => {
        // 파이어베이스에서 가져온 데이터를
        // TypeScript 에서 우리가 만든 Type 으로 형변환하기
        return item as TodoType;
      });
      // setTodoList(Array<TodoType>) 형을 원했다.
      dispatch(initTodoState(initData));
      // setTodoList(initData);
    }
  };
  // 화면의 내용을 갱신해 주기 위해서 state Hook 사용
  // const [todoList, setTodoList] = useState<Array<TodoType>>(initData);

  // 추가기능
  const addTodo = async (
    uid: string,
    title: string,
    body: string,
    done: boolean,
    sticker: string,
    date: string
  ) => {
    // firebase 에 쓰기
    try {
      const res = await setDoc(doc(fireDB, firebaseStorageName, uid), {
        uid: uid,
        title: title,
        body: body,
        date: date,
        sticker: sticker,
        done: false,
      });
      // console.log(res); // res는 undefined입니다.
    } catch (e) {
      console.log(e);
    }

    // 새로운 todoType 생성
    // 기존 todoList state 를 복사하고,
    // 추가 todoList 를 합쳐주고,
    // todoList state 를 업데이트한다.
    // 이때, immutable 을 유지한다.
    // 필수 라이브러리로 Immer 가 있다.
    // Immer 는 객체의 불변성을 유지하는 것으로
    // 업무에서 필수로 활용한다.
    // 즉, {...todoList, newTodo} 를 대신한다.
    let newTodoList = produce(todo.todoList, (draft) => {
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
    dispatch(
      addTodoState({
        uid: uid,
        title: title,
        body: body,
        date: date,
        sticker: sticker,
        done: false,
      })
    );
    // setTodoList(newTodoList);

    // localStorage.setItem(localStorageName, JSON.stringify(newTodoList));
  };
  // 수정기능
  const updateTodo = async (todo: TodoType) => {
    // 원하는 데이터 가져옴
    const userDoc = doc(fireDB, firebaseStorageName, todo.uid);
    try {
      const res = await updateDoc(userDoc, {
        title: todo.title,
        body: todo.body,
        sticker: todo.sticker,
        done: todo.done,
        date: moment(todo.date).format("YYYY-MM-DD"),
      });
      console.log(res); // res는 undefined
    } catch (e) {
      // console.log(e);
    } finally {
      // console.log("end");
    }

    // console.log("갱신될 내용 : ", todo);
    // 1. 먼저 uid 를 비교해서 배열의 순서에 맞는 1개를 찾는다.
    // const index = todoList.findIndex((item) => item.uid === todo.uid);
    // console.log("갱신될 index : ", index);
    // 2. 해당하는 uid 의 내용을 갱신한다.
    // const newTodoList = produce(todo.todoList, (draft) => {
    //   draft[index] = {
    //     ...draft[index],
    //     title: todo.title,
    //     body: todo.body,
    //     date: moment(todo.date).format("YYYY-MM-DD"),
    //     sticker: todo.sticker,
    //     done: todo.done,
    //   };
    // });
    // 3. state를 업데이트한다.
    // setTodoList(newTodoList);

    dispatch(updateTodoState(todo));

    // localStorage.setItem(localStorageName, JSON.stringify(newTodoList));
  };
  // 삭제기능
  const deleteTodo = async (todo: TodoType) => {
    // firebase 데이터 1개 삭제
    const userDoc = doc(fireDB, firebaseStorageName, todo.uid);
    try {
      const res = await deleteDoc(userDoc);
      // console.log(res); // res는 undefined
    } catch (e) {
      console.log(e);
    } finally {
      console.log("end");
    }

    // let index = todoList.findIndex((item) => todo.uid === item.uid);
    // state 의 목록을 삭제 후 갱신한다. 불변성 라이브러리 (immer) 활용
    // let newTodoList = produce( 대상, (draft) => {})
    // let newTodoList = produce(todoList, (draft) => {
    //   // index 의 순서로 부터 1개를 제거하고
    //   // 나머지 배열을 리턴한다.
    //   // 즉, 원본을 복사해서 새로운 배열을 만들고 그 중에 1개를 제거한후
    //   // 새로운 배열을 리턴하여 state 를 업데이트 한다.
    //   draft.splice(index, 1);
    // });
    // setTodoList(newTodoList);
    dispatch(deleteTodoState(todo));

    // localStorage.setItem(localStorageName, JSON.stringify(newTodoList));
  };
  // 전체 목록 삭제
  const clearTodo = () => {
    // setTodoList([]);

    dispatch(clearTodoState());

    todo.todoList.forEach(async (element) => {
      // firebase 데이터 1개 삭제
      const userDoc = doc(fireDB, firebaseStorageName, element.uid);
      try {
        const res = await deleteDoc(userDoc);
        // console.log(res); // res는 undefined
      } catch (e) {
        console.log(e);
      } finally {
        console.log("end");
      }
    });

    // localStorage.removeItem(localStorageName);
  };
  // 정렬기능
  const sortTodo = (sortType: string) => {
    dispatch(sortTodoState(sortType));
  };
  // state 관리기능타입
  const callBacks: CallBacksType = {
    addTodo,
    updateTodo,
    deleteTodo,
    sortTodo,
    clearTodo,
  };

  // 데이터목록의 타입
  const states: StatesType = { todoList: todo.todoList };

  // 현재 사용자가 로그인 된 상태인지 아닌지 구별
  // const [userLogin, setUserLogin] = useState(false);
  // 사용자 로그인 기능
  const fbLogin = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);

        dispatch(fbLoginState({ email, password }));
        // setUserLogin(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorCode : ", errorCode);
        console.log("errorMessage : ", errorMessage);
      });
  };
  // 사용자 가입
  const fbJoin = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // 생각을 더 해보자 ????
        dispatch(fbJoinState());
        // setUserLogin(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorCode : ", errorCode);
        console.log("errorMessage : ", errorMessage);
      });
  };
  // 사용자 로그아웃
  const fbLogout = () => {
    auth.signOut();

    dispatch(fbLogoutState());
    // setUserLogin(false);
  };
  // 회원탈퇴
  const fbDeleteUser = async () => {
    await deleteUser(auth.currentUser as User)
      .then(() => {
        // User deleted.
        dispatch(fbDeleteUserState());
        // setUserLogin(false);
      })
      .catch((error) => {
        // An error ocurred
        // ...
        console.log("회원 탈퇴 실패");
      });
  };

  // 로그인 관리 기능 타입
  const callBacksFireBase: CallBacksFireBaseType = {
    fbLogin,
    fbJoin,
    fbLogout,
    fbDeleteUser,
  };

  useEffect(() => {
    getLocalData();
  }, []);

  return (
    <App
      states={states}
      callBacks={callBacks}
      callBacksFireBase={callBacksFireBase}
      userLogin={user.userLogin}
    />
  );
};

export default AppContainer;