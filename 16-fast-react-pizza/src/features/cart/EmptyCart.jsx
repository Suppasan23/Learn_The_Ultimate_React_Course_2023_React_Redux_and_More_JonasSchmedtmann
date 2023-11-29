import LinkButton from '../../ui/LinkButton';

function EmptyCart() {
  return (
    <div className="px-3 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <p className="font-semiblod mt-7">
        Your cart is still empty. Start adding some pizzas :)
      </p>
      <img
        src="../public/empty-basket.jpg"
        alt="empty-basket"
        width={200}
        height={200}
      />
    </div>
  );
}

export default EmptyCart;
