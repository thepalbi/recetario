import m from 'mithril';
import { loadRecipes } from '../../api/recipes';
import Recipe from '../../components/Recipe';

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
          recipes.map(r => m(new Recipe(), { recipe: r }))
        ),
        m("pre.mt-2", JSON.stringify(recipes, null, 4))
      ]);
    }
  };
};