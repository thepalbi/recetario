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
  var ingredient;
  var ingredientName;
  return {
    oninit: function (vnode) {
      ingredient = vnode.attrs.ingredient;
      ingredientName = Object.keys(ingredient)[0];
    },
    view: function () {
      return m("li.list-group-item", ingredientName);
    }
  }
};