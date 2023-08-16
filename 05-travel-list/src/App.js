const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 1, packed: false },
];

export default function App() {
  return(
    <div className="app">
      <Logo/>
      <Form/>
      <PackingList/>
      <State/>
    </div>
  );
}

function Logo(){
  return <h1>🌴 Far Away</h1>
}

function Form(){

  function handleSubmit(event) {
    event.preventDefault()
    console.log(event);
  }

  return (
  <form className="add-form" onSubmit={handleSubmit}>
    <h3>🎃 What do you need for your trip?</h3>
    <select>
      {Array.from({ length:20 }, (_,i) => i + 1).map
      ((num) => (
        <option value={num} key={num}>
          {num}
        </option>
      ))}
    </select>
    <input type='text' placeholder="Item..." onClick={()=>handleSubmit}></input>
    <button onClick={()=>handleSubmit}>Add</button>
  </form>
  )
}

function PackingList(){
  return (
    <div className="list">
      <ul>
        {initialItems.map((eachItem) => (
        <Item item={eachItem} key={eachItem.id}/>
        ))}
      </ul>
    </div>
  );
}

function Item({item}){
  return (
    <li>
      <span style={{textDecoration : item.packed && 'Line-through'}}>
        {item.quantity}&nbsp;
        {item.description}
      </span>
      <button>❌</button>
    </li>
  )
}

function State(){
  return (
    <footer>
      <em>🎡 You have X item on your list, and you already packed X (X%)</em>
    </footer>
  )
}