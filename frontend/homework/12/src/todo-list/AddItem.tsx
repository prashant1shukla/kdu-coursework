// AddItem.tsx
import React, { useState } from 'react';
import './AddItem.scss';
import { useListContext, IListItem } from '../App';

export function AddItem() {
  const [inputText, setInputText] = useState('');
  const { list, setList } = useListContext();

  const handleAddItem = () => {
    const newItem: IListItem = { id: list.length + 1, text: inputText };
    setList([...list, newItem]);
    setInputText(''); // Clear input after adding item
  };

  return (
    <div className="add-item">
      <input
        type="text"
        className="add-input"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button id="add" className="add" onClick={handleAddItem}>
        Submit
      </button>
    </div>
  );
}
