import { useState } from "react";

export default function App() {
  const [theItem, setTheItem] = useState([]);

  function handleAddItem(recievedItemToAdd) {
    setTheItem((t) => [...t, recievedItemToAdd]);
  }

  function handleRemoveItem(recievedItemToDelete) {
    setTheItem((t)=>t.filter((tt) => tt.id !== recievedItemToDelete));
  }

  function handleCheckBoxItemChange(recievedItemToChangeCheckBox){
    setTheItem((t)=>t.map((tt) => tt.id === recievedItemToChangeCheckBox ? { ...tt, packed : !tt.packed} : tt));
  }

  return (
    <div className="app">
      <Logo />
      <Form handleAddItem={handleAddItem} />
      <PackingList theItem={theItem} handleRemoveItem={handleRemoveItem} handleCheckBoxItemChange={handleCheckBoxItemChange}/>
      <State theItem={theItem}/>
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away</h1>;
}

function Form({ handleAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItemObj = { description, quantity, packed: false, id: Date.now() };

    handleAddItem(newItemObj);

    setDescription("");
    setQuantity(1);
  }

  return (
    <>
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>🎃 What do you need for your trip?</h3>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {[
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20,
          ].map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Item..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <button>Add</button>
      </form>
    </>
  );
}

function PackingList({ theItem, handleRemoveItem, handleCheckBoxItemChange }) {
  return (
    <div className="list">
      <ul>
        {theItem.map((eachItem) => (
          <Item item={eachItem} key={eachItem.id} handleRemoveItem={handleRemoveItem} handleCheckBoxItemChange={handleCheckBoxItemChange}/>
        ))}
      </ul>
    </div>
  );
}

function Item({ item, handleRemoveItem, handleCheckBoxItemChange }) {
  return (
    <li >
      <input type='checkbox' value={item.packed} onChange={()=>handleCheckBoxItemChange(item.id)}></input>
      <span style={{ textDecoration: item.packed && "Line-through" }}>
        {item.quantity}&nbsp;
        {item.description}
      </span>
      <button onClick={()=>handleRemoveItem(item.id)}>❌</button>
    </li>
  );
}

function State({theItem}) {

  if(!theItem.length) return <p className="status"><em>Start adding some items to your packing list 🚀</em></p>

  const numItems = theItem.length;
  const processItems = theItem.filter((ff) => ff.packed).length;
  const percentage = Math.round((processItems / numItems) * 100)

  return (
    <footer className="status">
      <em>{percentage === 100 ? `You got everything ready to go ✈` :
         `🎡 You have ${numItems} item on your list, and you already packed ${processItems} ea (${percentage})%`
        }
      </em>
    </footer>
  );
}
