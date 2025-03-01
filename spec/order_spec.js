import { Order } from "../Order.js";

describe("Food Order Bot", function () {
    it("should welcome the user", function () {
        let order = new Order("999-999-9999");
        let responses = order.handleInput("");
        expect(responses[0]).toBe("Welcome to Dream Restaurant!");
    });

    it("should take an order for pizza", function () {
        let order = new Order("999-999-9999");
        order.handleInput("");
        let responses = order.handleInput("pizza");
        expect(responses[0]).toBe("What size pizza would you like? (Small, Medium, Large)");
    });

    it("should offer drink upsell", function () {
        let order = new Order("999-999-9999");
        order.handleInput("");
        order.handleInput("burger");
        order.handleInput("Medium");
        order.handleInput("Cheese");
        let responses = order.handleInput("Yes");
        expect(responses[0]).toContain("Great! We've added a drink to your order.");
    });
});
