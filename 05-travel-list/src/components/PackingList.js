import { useState } from "react";
import Item from "./Item";

export default function PackingList({ theItem, handleRemoveItem, handleCheckBoxItemChange, clearAllItems }) {

  const [sortBy, setSortBy] = useState('input')

  let sortedItems;

  if (sortBy === 'input') sortedItems = theItem;

  if(sortBy === 'description') sortedItems = theItem.slice().sort((a,b) => a.description.localeCompare(b.description));

  if(sortBy === 'packed') sortedItems = theItem.slice().sort((a,b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((eachItem) => (
          <Item item={eachItem} key={eachItem.id} handleRemoveItem={handleRemoveItem} handleCheckBoxItemChange={handleCheckBoxItemChange}/>
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
          <option value='input'>Sort by input order</option>
          <option value='description'>Sort by description</option>
          <option value='packed'>Sort by packed status</option>
        </select>

        <button onClick={()=>clearAllItems()}>Clear list</button>

      </div>
    </div>
  );
}