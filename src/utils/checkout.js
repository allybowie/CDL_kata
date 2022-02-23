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
}

module.exports = {
    calculateLineItemsTotal
}