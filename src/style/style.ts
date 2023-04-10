import styled from "@emotion/styled";
// 전체 레이아웃
export const Wrapper = styled.div`
  position: realtive;
  max-width: 1024px;
  margin: 0 auto;
  margin-top: 50px;
  background: #fff;
`;
// 공통레이아웃
export const Inner = styled.div`
  padding: 30px;
`;
// 앱 타이틀
export const AppTitle = styled.h1`
  text-align: center;
  padding: 30px 0;
  font-size: 30px;
  color: #000;
  margin-right: 20px;
`;
// 로그아웃 버튼
export const logout = styled.div`
  text-align: right;
  display:flex;
  justify-content:end;
  gap:10px;
  margin: 0px 0

`;

// 입력창
export const TodoInputWrap = styled.div`
  width: 95%;
  margin: 0 auto;
`;

// 목록창
export const TodoListWrap = styled.div`
  width: 95%;
  margin: 0 auto;
  padding-bottom: 50px;
  margin-bottom: 50px;
`;
// 아직 등록된내용이 없습니다. 
export const TodoListContent = styled.div`
 text-align:center;
  margin: 30px auto;
 border: 1px solid #000;
 padding: 20px 0;
 border-radius:20%:

`;
