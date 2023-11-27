import { Link } from "react-router-dom";

function CartOverview() {
  return (
    <div className="bg-stone-800 text-neutral-50 uppercase" >

      <hr/>

      <p className="text-stone-300 font-semibold  ">
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>

      <p>
      <Link to="/cart">Open cart &rarr;</Link>
      </p>

    </div>
  );
}

export default CartOverview;
