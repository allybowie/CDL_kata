const { calculateLineItemsTotal } = require("../src/utils/checkout.js");

const itemData = require("../src/data/products.json");

describe("Calculate Line Items Price - Method to calculate the correct total for each line item", () => {
    const itemA = itemData[0];
    const itemB = itemData[1];
    const itemC = itemData[2];

    test('Returns a number', () => {
        expect(typeof calculateLineItemsTotal(3, itemC) === 'number').toBe(true);
    })

    test('Returns the correct price for an item with no offer on it', () => {
        expect(calculateLineItemsTotal(3, itemC)).toBe(60);
    })

    test('Returns the correct price for the exact amount of items included in an offer', () => {
        expect(calculateLineItemsTotal(3, itemA)).toBe(130);
        expect(calculateLineItemsTotal(6, itemA)).toBe(260);
        expect(calculateLineItemsTotal(2, itemB)).toBe(45);
        expect(calculateLineItemsTotal(4, itemB)).toBe(90);
    });
    
    test("Returns the correct price if a number of items that isn't fully covered by the offer is entered", () => {
        expect(calculateLineItemsTotal(5, itemA)).toBe(230);
        expect(calculateLineItemsTotal(5, itemA)).toBe(230);
        expect(calculateLineItemsTotal(1, itemB)).toBe(30);
        expect(calculateLineItemsTotal(5, itemB)).toBe(120);
    });
})