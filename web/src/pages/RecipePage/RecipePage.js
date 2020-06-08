import RecipesLayout from 'src/layouts/RecipesLayout'
import RecipeCell from 'src/components/RecipeCell'

const RecipePage = ({ id }) => {
  return (
    <RecipesLayout>
      <RecipeCell id={id} />
    </RecipesLayout>
  )
}

export default RecipePage
