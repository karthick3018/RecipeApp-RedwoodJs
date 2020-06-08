import {
  Form,
  TextField,
  TextAreaField,
  FormError,
  Submit,
  FieldError,
  Label,
  useMutation,
  useQuery
} from '@redwoodjs/web'
import { useForm } from 'react-hook-form'

const QUERY = gql`
  query FIND_RECIPE_BY_ID($id: Int!) {
    recipe: recipe(id: $id) {
      id
      name
      description
      image_url
    }
  }
`

const UPDATE_RECIPE_MUTATION = gql`
  mutation UpdateRecipeMutation($id: Int!, $input: UpdateRecipeInput!) {
    updateRecipe(id: $id, input: $input) {
      id
    }
  }
`

const EditRecipeItemPage = (id) => {
  const { data, refetch, networkStatus } = useQuery(QUERY, {
    variables: { id: id?.id },

  })
  const formMethods = useForm();

  const [state, setState] = React.useState(null)

  React.useEffect(() => {
    setState(data?.recipe)
  }, [data])

  const [update, { loading, error }] = useMutation(UPDATE_RECIPE_MUTATION, {
    onCompleted: () => {
      alert('Recipe value updated!')
      formMethods.reset()
    },
  })

  const onSubmit = (data) => {

    let value = {
      name: data.name,
      description: data.description,
      image_url: state.image_url
    }

    update({ variables: { id: id.id, input: value } })
  }

  const handleChange = async (e) => {
    const data = new FormData()
    data.append("file", e?.target?.files[0])
    data.append("upload_preset", 'ordzpaf3')

    const res = await fetch("https://api.cloudinary.com/v1_1/karthick30/image/upload", {
      method: "POST",
      body: data,
    })

    const file = await res.json();

    let updatedValues = { ...state };
    updatedValues.image_url = file.secure_url;

    setState(prevState => {
      return { ...prevState, ...updatedValues };
    });


  }

  const handleInputChange = (e) => {
    let updatedValues = { ...state };
    updatedValues[e.target.name] = e.target.value;

    setState(prevState => {
      return { ...prevState, ...updatedValues };
    });
  }

  return (
    <div className="form-div">
      <h1>Edit Recipes</h1>
      <div className="container">
        <Form
          onSubmit={onSubmit}
          validation={{ mode: 'onBlur' }}
          error={error}
          formMethods={formMethods}
        >
          <FormError
            error={error}
            wrapperStyle={{ color: 'red', backgroundColor: 'lavenderblush' }}
          />
          <div className="form-field">
            <Label name="name" errorClassName="error">
              Name
        </Label>
            <TextField
              name="name"
              validation={{ required: true }}
              errorClassName="error"
              value={state?.name}
              onChange={handleInputChange}
              className ="text-field"
            />
            <FieldError name="name" className="error" />
          </div>

          <div  className="form-field">
            <Label name="description" errorClassName="error">
              Description
        </Label>
            <TextField
              name="description"
              validation={{
                required: true,
              }}
              errorClassName="error"
              value={state?.description}
              onChange={handleInputChange}
              className ="text-field"

            />
            <FieldError name="description" className="error" />
          </div>

          <figure>
            <img className="image" src={state?.image_url} />
          </figure>

          <input type="file" onChange={handleChange} />


          <div className="submit-btn">
          <Submit>Update</Submit>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default EditRecipeItemPage
