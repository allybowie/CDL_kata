const calculateLineItemsTotal = (amount, item) => {
    if(!item.specialPrice)
        return item.pricePerUnitPence * amount;

    const units = item.specialPrice.units
    const offerPrice = item.specialPrice.priceInPence
    
    const offerAmount = Math.floor(amount / units);
    const remainder = amount % units;
    
    const offerTotal = offerAmount * offerPrice;
    const remainderPrice = remainder * item.pricePerUnitPence;
    
    return offerTotal + remainderPrice;
};

const calculatePriceInPounds = (priceInPence) => {
    if(priceInPence < 10) {
        return parseFloat(`.0${priceInPence}`); 
    } else if (priceInPence < 100) {
        return parseFloat("." + priceInPence);
    }

    const penceArray = priceInPence.toString().split("");
    const pence = [...penceArray].slice(penceArray.length - 2).join("");
    const pounds = [...penceArray].slice(0, penceArray.length - 2).join("");

    return parseFloat(pounds + "." + pence);
}

const formatBasket = (basket) => {
    const reducedBasket = basket.reduce((newBasketObject, item) => {
        if(!newBasketObject[item.sku]) {
            newBasketObject[item.sku] = item;
            newBasketObject[item.sku].totalItems = 1;
            newBasketObject[item.sku].subTotalCost = calculatePriceInPounds(item.pricePerUnitPence);
            newBasketObject[item.sku].totalCost = calculatePriceInPounds(item.pricePerUnitPence);
        } else {
            newBasketObject[item.sku].totalItems = newBasketObject[item.sku].totalItems + 1;
            newBasketObject[item.sku].subTotalCost = calculatePriceInPounds(item.pricePerUnitPence * newBasketObject[item.sku].totalItems);
            newBasketObject[item.sku].totalCost = calculatePriceInPounds(calculateLineItemsTotal(newBasketObject[item.sku].totalItems, item));
        }

        return newBasketObject;
    }, {})
    return  reducedBasket
}

const convertIntoCurrency = (price) => {
    return price.toLocaleString("en-US", {
        style: "currency",
        currency: "GBP"
    });
}

const updateBasketItems = (basket, item, add) => {
    const newBasket = [...basket];

    if(add) {
        newBasket.push(item);
    } else {
        newBasket.splice(newBasket.indexOf(item), 1)
    }
    return newBasket;
}

const getBasketTotal = (basket) => {
    let basketArray = [];

    for(let key in basket) {
        basketArray.push(basket[key]);
    }
    const total = basketArray.reduce((basketTotal, item) => {
        basketTotal += item.totalCost;
        return basketTotal;
    }, 0)
    return convertIntoCurrency(total).toString();
}

module.exports = {
    calculateLineItemsTotal,
    calculatePriceInPounds,
    formatBasket,
    convertIntoCurrency,
    updateBasketItems,
    getBasketTotal
}