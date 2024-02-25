// Header.tsx
import React from 'react';
import './Header.scss';
import { SearchList } from './SearchList';
import { useListContext, useSearchTermContext } from '../App';

export function Header() {
  const { list } = useListContext();
  const { searchTerm } = useSearchTermContext();

  return (
    <div className="header">
      <h1 id="header">Item Lister</h1>
      <SearchList />
    </div>
  );
}
