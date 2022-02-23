import { convertIntoCurrency } from "../../utils/checkout.js";

const BasketCard = (props) => {
    return <div className="productCardContainer">
        <p>Item: {props.item.name}</p>
        <p>Amount: {props.item.totalItems}</p>
        <p>Subtotal: {convertIntoCurrency(props.item.subTotalCost)}</p>
        <p>Total: {convertIntoCurrency(props.item.totalCost)}</p>
    </div>
}

export default BasketCard;