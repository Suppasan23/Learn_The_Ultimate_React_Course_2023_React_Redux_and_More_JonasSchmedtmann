import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import State from "./State";

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

  function clearAllItems(){
    const confirm = window.confirm('Are you sure you want to delete all items>');

    if(confirm) setTheItem([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form handleAddItem={handleAddItem} />
      <PackingList theItem={theItem} handleRemoveItem={handleRemoveItem} handleCheckBoxItemChange={handleCheckBoxItemChange} clearAllItems={clearAllItems}/>
      <State theItem={theItem}/>
    </div>
  );
}