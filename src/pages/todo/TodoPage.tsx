/**
 * @description : 불필요한 리렌더링 방지를 위한 React.memo 사용 Test Sample
 *
 * TodoItem 컴포넌트를 React.memo로 처리
 * memo 하지않는다면, List Item 하나가 변경될 때마다 다른 List Item 컴포넌트도 전부 리렌더링된다
 * Test : MemoizedTodoItem 컴포넌트를 일반 TodoItem 컴포넌트로 교체하여 전후비교
 * @todo 리스트 정렬
 */

import { useCallback, useState } from 'react';
import { MemoizedTodoItem } from './TodoItem';
import { BasicButton } from '../../components/atoms/Button';
import { InfoBox } from '../../components/molecules/InfoBox';

export interface TodoContent {
  id: number;
  title: string;
  isDone: boolean;
}
const MockList: TodoContent[] = [
  {
    id: 1,
    title: '스쿼트1',
    isDone: false,
  },
  {
    id: 2,
    title: '스쿼트2',
    isDone: true,
  },
  {
    id: 3,
    title: '스쿼트3',
    isDone: false,
  },
];

const TodoPage: React.FC = () => {
  const [todoList, setTodoList] = useState<TodoContent[]>(MockList);

  const handleLastAdd = () => {
    setTodoList((prev) => [
      ...prev,
      {
        id: prev[prev.length - 1].id + 1,
        title: `스쿼트${prev[prev.length - 1].id + 1}`,
        isDone: false,
      },
    ]);
  };
  const handleLastDelete = () => {
    setTodoList((prev) => prev.slice(0, prev.length - 1));
  };

  /**
   * memo된 컴포넌트인 TodoItem으로 전달하는 함수이므로 useCallback 처리
   * memo된 컴포넌트의 props가 객체타입 or 함수라면,
   * 부모 컴포넌트가 리렌더링될 때 주소값이 변화하므로 props가 변경된 것으로 인식하여 자식컴포넌트도 리렌더링됨
   * => 객체는 useMemo, 함수는 useCallback 처리
   */
  const handleDelete = useCallback((id: number) => {
    setTodoList((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handleUpdate = useCallback((id: number) => {
    setTodoList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isDone: !item.isDone } : item))
    );
  }, []);

  return (
    <>
      <InfoBox>
        <p>React.memo Test Sample</p>
      </InfoBox>
      <BasicButton onClick={handleLastAdd}>Add</BasicButton>
      <BasicButton onClick={handleLastDelete}>Last Delete</BasicButton>
      {todoList.map((item: TodoContent) => (
        <MemoizedTodoItem
          key={item.id}
          content={item}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </>
  );
};

export default TodoPage;
