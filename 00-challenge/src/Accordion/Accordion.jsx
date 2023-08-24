import { useState } from "react";
import "./styles.css";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus."
  },
  {
    title: "How long do I have to return my chair?",
    text:
      "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus."
  },
  {
    title: "Do you ship to countries outside the EU?",
    text:
      "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!"
  }
];

export default function Accordion() {

    const [whichOpen, setWhichOpen] = useState(null);
    
    return (
        <>
            <h3>Accordion</h3>
            <div className="accordion">
                <ul className="content-box">
                {faqs.map((eachFaqs, index) => (
                    <Item   key={index}
                            index={index}
                            title={eachFaqs.title}
                            whichOpen={whichOpen}
                            setWhichOpen={setWhichOpen}
                    >
                            {eachFaqs.text}
                    </Item>
                ))}
                </ul>
            </div>
        </>
    )
}

function Item({index, title, whichOpen, setWhichOpen, children}){

    const isOpen = index === whichOpen;

    function toggleOpen(){
        if (index === whichOpen)
        {
            setWhichOpen(null)
        }
        else
        {
            setWhichOpen(index)
        }
    }

    return(
        <>
            <li className={`item ${isOpen && "open"}`} onClick={() => toggleOpen()}>
                <h4 className="number">{index < 9 ? `0${index + 1}` : index + 1}</h4>
                <h4 className="title">{title}</h4>
                <h4 className="icon">{isOpen ? "-" : "+"}</h4>
                {isOpen && <p className="content-box">{children}</p>}
            </li>
        </>
    )
}