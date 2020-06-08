// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route } from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      <Route path="/editRecipe/{id:Int}" page={EditRecipeItemPage} name="editRecipeItem" />
      <Route path="/add-recipe-item" page={AddRecipeItemPage} name="addRecipeItem" />
      <Route path="/" page={RecipelistPage} name="recipelist" />
      <Route path="/recipes/new" page={NewRecipePage} name="newRecipe" />
      <Route path="/recipes/{id:Int}/edit" page={EditRecipePage} name="editRecipe" />
      <Route path="/recipes/{id:Int}" page={RecipePage} name="recipe" />
      <Route path="/recipes" page={RecipesPage} name="recipes" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
