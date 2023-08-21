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
    
    return (
        <>
            <h3>Accordion</h3>
            <div className="accordion">
                <ul className="content-box">
                {faqs.map((eachFaqs, index) => (
                    <Item   faqs={eachFaqs}
                            index={index}
                    />
                ))}
                </ul>
            </div>
        </>
    )
}


function Item({faqs, index}){

    const [isOpen, setIsOpen] = useState(false);

    return(
        <>
            <li className={`item ${isOpen && "open"}`} onClick={() => setIsOpen((s) => s = !isOpen)}>
                <h4 className="number">{index < 9 ? `0${index + 1}` : index + 1}</h4>
                <h4 className="title">{faqs.title}</h4>
                <h4 className="icon">{isOpen ? "-" : "+"}</h4>
                {isOpen && <p className="content-box">{faqs.text}</p>}
            </li>
        </>
    )
}