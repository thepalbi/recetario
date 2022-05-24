import m from 'mithril';
import { loadRecipes } from '../../api/recipes';

export default function () {
  var recipes;
  return {
    oninit: function (vnode) {
      recipes = loadRecipes();
      console.log(recipes);
    },
    view: function () {
      return m("div.container", [
        m("h1", "Recetario"),
        m("div.row",
          recipes.map(r => m("p", r.recipe_name))
        )
      ]);
    }
  };
};