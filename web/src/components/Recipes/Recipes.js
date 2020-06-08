import { useMutation } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'

const DELETE_RECIPE_MUTATION = gql`
  mutation DeleteRecipeMutation($id: Int!) {
    deleteRecipe(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const RecipesList = ({ recipes }) => {
  const [deleteRecipe] = useMutation(DELETE_RECIPE_MUTATION)

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete recipe ' + id + '?')) {
      deleteRecipe({ variables: { id }, refetchQueries: ['RECIPES'] })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>description</th>
            <th>image_url</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe) => (
            <tr key={recipe.id}>
              <td>{truncate(recipe.id)}</td>
              <td>{truncate(recipe.name)}</td>
              <td>{truncate(recipe.description)}</td>
              <td>{truncate(recipe.image_url)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.recipe({ id: recipe.id })}
                    title={'Show recipe ' + recipe.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editRecipe({ id: recipe.id })}
                    title={'Edit recipe ' + recipe.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete recipe ' + recipe.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(recipe.id)}
                  >
                    Delete
                  </a>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RecipesList
