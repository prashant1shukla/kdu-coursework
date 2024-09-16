// TodoList.tsx
import React from 'react';
import './TodoList.scss';
import { Header } from './Header';
import { AddItem } from './AddItem';
import { List } from './List';

export function TodoList() {
  return (
    <div className="todo-list">
      <Header />
      <div className="items">
        <h2 className="add-item">Add Items</h2>
        <AddItem />
        <h2 className="add-item">Items</h2>
        <List />
      </div>
    </div>
  );
}
