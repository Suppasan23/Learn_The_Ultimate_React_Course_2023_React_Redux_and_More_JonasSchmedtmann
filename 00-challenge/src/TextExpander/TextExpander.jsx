import { useState } from "react";
import "./styles.css";

export default function TextExpander(){
    return(
        <div>
        <h3>Text Expander</h3>
        <br/>

        <TheTextComponent>
          Space travel is the ultimate adventure! Imagine soaring past the stars
          and exploring new worlds. It's the stuff of dreams and science fiction,
          but believe it or not, space travel is a real thing. Humans and robots
          are constantly venturing out into the cosmos to uncover its secrets and
          push the boundaries of what's possible.
        </TheTextComponent>
        <br/>
  
        <TheTextComponent
            collapsedNumWords={100}
            expandButtonText="Show text"
            collapseButtonText="Collapse text"
            buttonColor="#ff6622"
        >
          Space travel requires some seriously amazing technology and
          collaboration between countries, private companies, and international
          space organizations. And while it's not always easy (or cheap), the
          results are out of this world. Think about the first time humans stepped
          foot on the moon or when rovers were sent to roam around on Mars.
        </TheTextComponent>
        <br/>
  
        <TheTextComponent 
            expanded={true} 
            className="box"
        >
          Space missions have given us incredible insights into our universe and
          have inspired future generations to keep reaching for the stars. Space
          travel is a pretty cool thing to think about. Who knows what we'll
          discover next!
        </TheTextComponent>
      </div>
    )
}

function TheTextComponent({
    collapsedNumWords = 50, 
    expandButtonText = "Show more", 
    collapseButtonText = "Show less", 
    buttonColor = "#1f09cd", 
    expanded = false,
    className = "",
    children,
}) 
{
const [isExpand, setIsExpand] = useState(expanded)
const textCut = children.substring(0, collapsedNumWords).concat("...")

console.log(textCut)

    return (
        <div style={{ textAlign: "left" }} className={className}>

            <span>
                {isExpand ? children : textCut}
            </span>

            <span style={{ color: buttonColor, cursor:'pointer' }} onClick={()=>setIsExpand((x)=> x = !isExpand )}>
                {isExpand ? (" ").concat(collapseButtonText) : (" ").concat(expandButtonText)}
            </span>

        </div>
    )  
}