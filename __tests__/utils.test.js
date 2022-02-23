const { calculateLineItemsTotal, calculatePriceInPounds, formatBasket } = require("../src/utils/checkout.js");
const testData = require("./testData/testData.json");
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
});

describe("Calculate Price in pounds (Decimals)", () => {
    const itemB = itemData[1];

    test("It returns a number", () => {
        expect(typeof calculatePriceInPounds(130) === 'number').toBe(true);
    });

    test("It returns a number with up to 2 decimal places", () => {
        const linePriceItemB = calculateLineItemsTotal(5, itemB);
        const linePriceItemBTwo = calculateLineItemsTotal(2, itemB);

        expect(calculatePriceInPounds(45)).toBe(0.45);
        expect(calculatePriceInPounds(3)).toBe(0.03);
        expect(calculatePriceInPounds(137)).toBe(1.37);
        expect(calculatePriceInPounds(linePriceItemB)).toBe(1.2);
        expect(calculatePriceInPounds(linePriceItemBTwo)).toBe(0.45);
    });
});

describe("Formats the basket to give a single entry for each different line item, with a total amount, subtotal cost and total cost (depending on offers)", () => {
    const testBasketData = testData.formatBasket;
    test("It returns an object", () => {
        expect(typeof formatBasket(testBasketData) === "object").toBe(true);
    });

    test("It returns an object with 3 keys", () => {
        expect(Object.entries(formatBasket(testBasketData)).length).toBe(3);
    });

    test("It returns an object with 3 entries, each with a 'totalItems' key", () => {
        expect(formatBasket(testBasketData).C.totalItems).toBe(1);
        expect(formatBasket(testBasketData).A.totalItems).toBe(4);
        expect(formatBasket(testBasketData).B.totalItems).toBe(3);
    });

    test("It returns an object with 3 entries, each with a 'subTotalCost' key which shows the value before applying offers in pounds", () => {
        expect(formatBasket(testBasketData).C.subTotalCost).toBe(0.20);
        expect(formatBasket(testBasketData).A.subTotalCost).toBe(2.00);
        expect(formatBasket(testBasketData).B.subTotalCost).toBe(0.90);
    });

    test("It returns an object with 3 entries, each with a 'totalCost' key which shows the value after applying offers in pounds", () => {
        expect(formatBasket(testBasketData).C.totalCost).toBe(0.20);
        expect(formatBasket(testBasketData).A.totalCost).toBe(1.80);
        expect(formatBasket(testBasketData).B.totalCost).toBe(0.75);
    });
})