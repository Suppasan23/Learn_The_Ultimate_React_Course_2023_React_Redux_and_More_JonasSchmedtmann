export default function State({theItem}) {

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