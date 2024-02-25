// List.tsx
import React from 'react';
import './List.scss';
import { ListItem } from './ListItem';
import { useListContext, useSearchTermContext, IListItem } from '../App';

export function List() {
  const { list } = useListContext();
  const { searchTerm } = useSearchTermContext();

  const filteredList = list.filter((item: IListItem) =>
    item.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ul id="list">
      {filteredList.length > 0 ? (
        filteredList.map((item: IListItem) => (
          <ListItem key={item.id} text={item.text} id={item.id} />
        ))
      ) : (
        <li className="list-item">No result found</li>
      )}
    </ul>
  );
}
