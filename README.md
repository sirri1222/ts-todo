# Todo App

1. 프로젝트 설계

- 상태 데이터 (할일)
  [
    {
      uid : string(날짜),
      title : string(제목),
      body : string(내용),
      done : boolean(수행여부),
      sticker : string(스티커이미지),
      date : string(날짜),
    }
  ]

- 기능 정의

추가기능
addTodo(title:string, body:string, date:string, sticker:string, done:boolean=false) void

수정기능
updateTodo(todo:TodoType) void

삭제기능
deleteTodo(todo:TodoType) void

필터기능
sortTodo (sortType:string) Array<TodoType>

목록기능

- 컴포넌트 종류

** 데이터의 상태를 전담해서 관리해줄 컴포넌트
: 상태업데이트 역할(제어/컨트롤컴포넌트),
src/AppContainer.tsx (상태관리 CRUD 전담)


: 상태보여주기 역할(비제어/프레젠트컴포넌트),
src/App.tsx (페이지 컴포넌트)
components/Input.tsx(할일 입력 컴포넌트)
components/List.tsx(할일 목록 출력 컴포넌트)
components/ListItem.tsx(할일 목록 컴포넌트)
