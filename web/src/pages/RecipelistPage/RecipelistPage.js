import { navigate,routes } from '@redwoodjs/router';
import RecipeListRender from '../../components/RenderRecipeListCell';

const RecipelistPage = () => {

  const handleAddClick = () => {
   navigate(routes.addRecipeItem())
  }

  return (
    <div>
      <h1>RecipelistPage</h1>
      <button className="add-new" onClick = { handleAddClick }>Add New</button>

      <RecipeListRender/>
    </div>
  )
}

export default RecipelistPage
