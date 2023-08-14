import React from "react";
import  ReactDOM  from "react-dom/client";

export default function Show () {
    const x = "Benz";
    return <h1>Hello Alien!!!!!</h1>;
}

// React v18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
    <Show/>
    </React.StrictMode>
);