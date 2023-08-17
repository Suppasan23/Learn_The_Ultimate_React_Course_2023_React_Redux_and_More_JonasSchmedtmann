import { useState } from "react";

export default function OpenTheDoor() {
  const [doorState, setDoorState] = useState(true);

  return (
    <>
      <h3>Open the door Chellenge</h3>
      <br />
      <img
        onClick={() => setDoorState((door) => !door)}
        src={doorState ? "image/dooropen.jpg" : "image/doorclose.jpg"}
        alt={doorState ? "dooropen" : "doorclose"}
        width={400}
      ></img>
    </>
  );
}
