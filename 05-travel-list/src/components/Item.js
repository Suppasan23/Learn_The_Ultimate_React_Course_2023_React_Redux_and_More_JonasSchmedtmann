export default function Item({ item, handleRemoveItem, handleCheckBoxItemChange }) {
    
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