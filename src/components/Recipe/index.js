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
      let formattedFirstAmount;
      if (ingredientDetails && ingredientDetails.amounts) {
        const firstAmount = ingredientDetails.amounts[0];
        formattedFirstAmount = <small>{`${firstAmount.amount} ${firstAmount.unit}`}</small>;
      }
      return (
        <div class="list-group-item list-group-item-action flex-column align-items-start">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{ingredientName}</h5>
            {formattedFirstAmount}
          </div>
          {ingredientDetails && ingredientDetails.notes && <small class="text-muted">{ingredientDetails.notes}</small>}
        </div>
      );
    }
  }
};