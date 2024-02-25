// App.tsx
import React, { createContext, useState, useContext } from 'react';
import './App.scss';
import { TodoList } from './todo-list/TodoList';

export interface IListItem {
  id: number;
  text: string;
}

// Define context for managing the list
export const ListContext = createContext<{
  list: IListItem[];
  setList: React.Dispatch<React.SetStateAction<IListItem[]>>;
}>({
  list: [],
  setList: () => {},
});

// Define context for managing the search term
export const SearchTermContext = createContext<{
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}>({
  searchTerm: '',
  setSearchTerm: () => {},
});

export function useListContext() {
  return useContext(ListContext);
}

export function useSearchTermContext() {
  return useContext(SearchTermContext);
}

function App() {
  const [list, setList] = useState<IListItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <ListContext.Provider value={{ list, setList }}>
      <SearchTermContext.Provider value={{ searchTerm, setSearchTerm }}>
        <TodoList />
      </SearchTermContext.Provider>
    </ListContext.Provider>
  );
}

export default App;
