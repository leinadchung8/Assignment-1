export class Order {
  constructor(sFrom) {
      this.OrderState = {
          WELCOMING: () => {
              let aReturn = [];
              this.stateCur = this.OrderState.ORDERING;
              aReturn.push("Welcome to Dream Restaurant!");
              aReturn.push("What would you like to order? We have Pizza and Burgers.");
              return aReturn;
          },
          ORDERING: (sInput) => {
              let aReturn = [];
              if (sInput.toLowerCase().includes("pizza")) {
                  this.order = { item: "Pizza", size: null, toppings: null };
                  this.stateCur = this.OrderState.SIZE;
                  aReturn.push("What size pizza would you like? (Small, Medium, Large)");
              } else if (sInput.toLowerCase().includes("burger")) {
                  this.order = { item: "Burger", size: null, toppings: null };
                  this.stateCur = this.OrderState.SIZE;
                  aReturn.push("What size burger would you like? (Small, Medium, Large)");
              } else {
                  aReturn.push("Sorry, we only have Pizza and Burgers. Please choose one.");
              }
              return aReturn;
          },
          SIZE: (sInput) => {
              let aReturn = [];
              this.order.size = sInput;
              this.stateCur = this.OrderState.TOPPINGS;
              aReturn.push(`Great choice! What toppings would you like on your ${this.order.item}?`);
              return aReturn;
          },
          TOPPINGS: (sInput) => {
              let aReturn = [];
              this.order.toppings = sInput;
              this.stateCur = this.OrderState.UPSELL;
              aReturn.push(`Got it! Would you like a drink with that? (Yes/No)`);
              return aReturn;
          },
          UPSELL: (sInput) => {
              let aReturn = [];
              if (sInput.toLowerCase().startsWith("y")) {
                  this.order.drink = "Yes";
                  aReturn.push("Great! We've added a drink to your order.");
              } else {
                  this.order.drink = "No";
                  aReturn.push("No drink added.");
              }
              this.stateCur = this.OrderState.CONFIRMATION;
              aReturn.push(`You ordered a ${this.order.size} ${this.order.item} with ${this.order.toppings}.`);
              if (this.order.drink === "Yes") aReturn.push("Including a drink.");
              aReturn.push("Would you like to confirm your order? (Yes/No)");
              return aReturn;
          },
          CONFIRMATION: (sInput) => {
              let aReturn = [];
              if (sInput.toLowerCase().startsWith("y")) {
                  aReturn.push("Thank you! Your order has been placed.");
              } else {
                  aReturn.push("Order canceled.");
              }
              this.isDone = true;
              return aReturn;
          }
      };

      this.stateCur = this.OrderState.WELCOMING;
      this.isDone = false;
      this.sFrom = sFrom;
  }

  handleInput(sInput) {
      return this.stateCur(sInput);
  }

  isDone() {
      return this.isDone;
  }
}
