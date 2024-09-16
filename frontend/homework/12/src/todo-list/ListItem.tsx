// ListItem.tsx
import React from 'react';
import './ListItem.scss';
import { useListContext, IListItem } from '../App';

interface ListItemProps {
  text: string;
  id: number;
}

export function ListItem({ text, id }: ListItemProps) {
  const { list, setList } = useListContext();

  const handleDelete = () => {
    setList((prevList) => prevList.filter((item) => item.id !== id));
  };

  return (
    <li className="list-item">
      <span>{text}</span>
      <button className="btn-dlt" onClick={handleDelete}>
        X
      </button>
    </li>
  );
}
