import Recipe from 'src/components/Recipe'

export const QUERY = gql`
  query FIND_RECIPE_BY_ID($id: Int!) {
    recipe: recipe(id: $id) {
      id
      name
      description
      image_url
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Recipe not found</div>

export const Success = ({ recipe }) => {
  return <Recipe recipe={recipe} />
}
