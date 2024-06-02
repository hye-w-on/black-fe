/**
 * @description 자식컴포넌트 리렌더링 방지를 위한 React.memo 사용
 */

import { memo } from 'react';
import { TodoContent } from './TodoPage';
import { BasicButton } from '../../components/atoms/Button';

export interface TodoItemProps {
  content: TodoContent;
  onDelete: (id: number) => void;
  onUpdate: (id: number) => void;
}

function TodoItem({ content, onDelete, onUpdate }: TodoItemProps) {
  console.log('렌더링', content.title);
  return (
    <>
      <div>
        {content.title} {content.isDone ? 'v' : '-'}
      </div>
      <BasicButton onClick={() => onDelete(content.id)}>Delete</BasicButton>
      <BasicButton onClick={() => onUpdate(content.id)}>Done Update</BasicButton>
    </>
  );
}

//memo 하지않는다면, List Item 하나가 변경될 때마다 다른 List Item 컴포넌트도 전부 리렌더링된다.
const MemoizedTodoItem = memo(TodoItem);
export default MemoizedTodoItem;
