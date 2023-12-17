# Typescript Todo list

typescript를 이용하여 단계별로 투두 리스트 구현하기

## level 단계

1. state와 props를 이용하여 구현하기
2. RTK를 이용하여 구현하기 
3. RTK + json-server 이용하여 구현하기 
4. RTK + json-server + redux thunk 이용하여 구현하기
5. RTK + react-query 이용하여 구현하기
6. Redux query 이용하여 구현하기
7. zustand 이용하여 구현하기
---
### 다음 목표
1. jotai 이용하여 구현하기
2. SWR 이용하여 구현하기
3. Context API 이용하여 구현하기


## 필수 구현 사항
- Todo 항목 추가하기
- Todo 항목 목록 표시
- Todo 항목 삭제하기
- Todo 완료 상태 표시 기능
- Typescript를 이용하여 구현


## 특징
- level 1만 CSS 적용. 그 외 레벨은 기능 구현을 목적으로 함
- 다양한 라이브러리들을 typescript를 이용하여 구현함으로써 각 라이브러리의 사용 방식과 typescript를 적용해서 구현할 수 있음에 그 목적이 있음
- 각 레벨별로 Type을 다양한 방식으로 표현
  - enum 사용
  - generic 사용
  - Partial, Omit, Pick 등 유틸 타입 사용
  - 타입 추상화
    ex ) ```typescript type TypeForDeleteTodo = Pick<Todo,'id'>```
  - 중복제거에 목적을 둔 함수의 타입 설정
    ```typescript
    // 내부적으로 pending이 존재한다는 것을 명시 (level4)
    type Pending<P = any> = { pending: P };
    function addPendingCaseThunks(
      builder: ActionReducerMapBuilder<TodoState>,
      thunks: Pending[],
    ) {
      return thunks.reduce<typeof builder>((builder, cur) => {
        return builder.addCase(cur.pending, (state) => {
          state.isLoading = true;
          state.isError = false;
          state.error = null;
        });
      }, builder);
    }
    // id를 기반으로 index를 찾는 함수 (level4)
    const findIndexByTodoId = (todos: Todo[], id: TodoId) => todos.findIndex((todo) => todo.id === id);

    ```
