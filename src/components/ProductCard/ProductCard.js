import { calculatePriceInPounds, convertIntoCurrency } from "../../utils/checkout.js";
import "./productCard.scss";

const ProductCard = (props) => {

    const renderOffer = () => {
        if(!props.item.specialPrice)
            return;

        return <div>
            <p>Special Offer:</p>
            <p>{props.item.specialPrice.units} for {convertIntoCurrency(calculatePriceInPounds(props.item.specialPrice.priceInPence))}</p>
        </div>
    }

    const updateParent = (plus) => {
        props.clickAction(props.item, plus)
    }

    return <div className="productCardContainer">
        <p>{props.item.name}</p>
        <p>Price: {convertIntoCurrency(calculatePriceInPounds(props.item.pricePerUnitPence))}</p>
        {renderOffer()}
        <div className="buttonContainer">
            <div className="add" onClick={() => updateParent(true)}></div>
            <div className="remove" onClick={() => updateParent(false)}></div>
        </div>
    </div>
}

export default ProductCard;