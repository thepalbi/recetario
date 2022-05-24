import m from "mithril";

export default function () {
  var recipe;
  return {
    oninit: function (vnode) {
      recipe = vnode.attrs.recipe;
    },
    view: function () {
      return m("div.card",
        m("div.card-body", [
          m("h3.card-header", recipe.recipe_name),
          m(new IngredientList(), { ingredients: recipe.ingredients })
        ])
      )
    },
  };
}

function IngredientList() {
  var ingredients;
  return {
    oninit: function (vnode) {
      ingredients = vnode.attrs.ingredients;
    },
    view: function () {
      return m("ul.list-group list-group-flush",
        ingredients.map(i => {
          return m(new Ingredient(), { ingredient: i })
        })
      )
    }
  };
};

function Ingredient() {
  var ingredientName;
  var ingredientDetails;
  return {
    oninit: function (vnode) {
      ingredientName = Object.keys(vnode.attrs.ingredient)[0];
      ingredientDetails = vnode.attrs.ingredient[ingredientName];
      console.log(`details for ${ingredientName}`, ingredientDetails);
    },
    view: function () {
      let amountComponent = m("span.badge", "N/A");
      if (ingredientDetails && ingredientDetails.amounts) {
        let singleAmount = ingredientDetails.amounts[0];
        amountComponent = m("span.badge badge-primary", `${singleAmount.amount} ${singleAmount.unit}`);
      }
      return m("li.list-group-item d-flex justify-content-between align-items-center", [
        m("p", ingredientName),
        amountComponent,
      ]);
    }
  }
};