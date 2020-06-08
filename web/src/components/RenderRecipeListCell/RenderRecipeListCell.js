import { useMutation } from '@redwoodjs/web'
import { navigate,routes } from '@redwoodjs/router';
import DeleteIcon from '../../../public/deleteIcon.png'

export const QUERY = gql`
  query {
    recipes {
      id
      name
      description
      image_url
    }
  }
`

const DELETE_RECIPE_MUTATION = gql`
  mutation DeleteRecipeMutation($id: Int!) {
    deleteRecipe(id: $id) {
      id
    }
  }
`



export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ recipes }) => {

  const [deleteRecipe] = useMutation(DELETE_RECIPE_MUTATION, {
    onCompleted: () => {
      location.reload()
    },
  })

  const handleEditRoute = (id) => (
    navigate(`/editRecipe/${id}`)
  )

  const handleDelete = (e,id)=>{
    e.stopPropagation();
    if (confirm('Are you sure you want to delete recipe ' + id + '?')) {
      deleteRecipe({ variables: { id } })
    }
  }

  return (
   <div className="container">
    {recipes.map((eachRecipe) => (
      <div className="list-div" key = {  eachRecipe.id } onClick = { ()=>handleEditRoute(eachRecipe.id) }>
        <h2>{eachRecipe.name}<span onClick = { (e)=>handleDelete(e,eachRecipe.id) } className="delete-span"><img className="delete-img" src={DeleteIcon}/></span></h2>
        <div>{eachRecipe.description}</div>
        <figure className="figure-block">
          <img className="image"  src = { eachRecipe.image_url }/>
        </figure>
      </div>
    ))}
    </div>
  )
}

