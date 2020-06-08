import RecipesLayout from 'src/layouts/RecipesLayout'
import EditRecipeCell from 'src/components/EditRecipeCell'

const EditRecipePage = ({ id }) => {
  return (
    <RecipesLayout>
      <EditRecipeCell id={id} />
    </RecipesLayout>
  )
}

export default EditRecipePage
