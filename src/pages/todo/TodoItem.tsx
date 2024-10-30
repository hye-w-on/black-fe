/**
 * @description 불필요한 리렌더링 방지를 위한 React.memo 사용
 *
 * props의 변화가 있을 때만 랜더링을 하므로
 * 부모 컴포넌트가 리랜더링된다해도 자식 컴포넌트는 리랜더링되지 않음
 */

import { memo } from 'react';
import { TodoContent } from './TodoPage';
import { BasicButton } from '../../components/atoms/Button';

export interface TodoItemProps {
  content: TodoContent;
  onDelete: (id: number) => void;
  onUpdate: (id: number) => void;
}

export function TodoItem({ content, onDelete, onUpdate }: TodoItemProps) {
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
export const MemoizedTodoItem = memo(TodoItem);
