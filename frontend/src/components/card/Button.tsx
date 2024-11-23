import { BiTrash } from "react-icons/bi";
import { IoIosSave } from "react-icons/io";
import { MdShoppingCart } from "react-icons/md";

interface ButtonProps {
  edit: boolean;
  isBasketPage: boolean;
  handleSave: () => void;
  handleDeleteFromBasket: () => void;
  handleAddToBasket: () => void;
}
const Button = ({ edit, isBasketPage, handleSave, handleDeleteFromBasket, handleAddToBasket }: ButtonProps) => {
  const buttonText = edit ? "Save" : isBasketPage ? "Delete" : "Add to Basket";
  const buttonIcon = edit ? <IoIosSave /> : isBasketPage ? <BiTrash /> : <MdShoppingCart />;
  const handleClick = edit ? handleSave : isBasketPage ? handleDeleteFromBasket : handleAddToBasket;

  return (
    <button className="cardbox__link" onClick={handleClick}>
      {buttonText}
      <span className="cardbox__span">{buttonIcon}</span>
    </button>
  );
};

export default Button;
