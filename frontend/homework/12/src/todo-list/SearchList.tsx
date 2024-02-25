// SearchList.tsx
import React from 'react';
import './Search.scss';
import { useSearchTermContext } from '../App';

export function SearchList() {
  const { searchTerm, setSearchTerm } = useSearchTermContext();

  return (
    <div>
      <input
        className="search"
        type="text"
        placeholder="Search Items..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
