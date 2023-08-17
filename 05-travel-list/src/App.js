import { useState } from "react";

export default function App() {
  const [theItem, setTheItem] = useState([]);

  function handleAddItem(recievedItem) {
    setTheItem((t) => [...t, recievedItem]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList theItem={theItem} />
      <State />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away</h1>;
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItemObj = { description, quantity, packed: false, id: Date.now() };

    onAddItem(newItemObj);

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

function PackingList({ theItem }) {
  return (
    <div className="list">
      <ul>
        {theItem.map((eachItem) => (
          <Item item={eachItem} key={eachItem.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={{ textDecoration: item.packed && "Line-through" }}>
        {item.quantity}&nbsp;
        {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}

function State() {
  return (
    <footer>
      <em>🎡 You have X item on your list, and you already packed X (X%)</em>
    </footer>
  );
}
