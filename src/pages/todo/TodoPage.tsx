/**
 * @description
 * - React.memo를 위한 useCallback
 * - 배열 불변성 CUD
 * @todo 리스트 정렬
 */

import { useCallback, useState } from 'react';
import TodoItem from './TodoItem';
import { BasicButton } from '../../components/atoms/Button';

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
      <BasicButton onClick={handleLastAdd}>Add</BasicButton>
      <BasicButton onClick={handleLastDelete}>Last Delete</BasicButton>
      {todoList.map((item: TodoContent) => (
        <TodoItem key={item.id} content={item} onDelete={handleDelete} onUpdate={handleUpdate} />
      ))}
    </>
  );
};

export default TodoPage;
