import {
  Form,
  TextField,
  TextAreaField,
  FormError,
  Submit,
  FieldError,
  Label,
  useMutation,
} from '@redwoodjs/web'
import { navigate } from '@redwoodjs/router';

import { useForm } from 'react-hook-form'

const CREATE_RECIPE = gql`
  mutation CreateRecipeMutation($input: CreateRecipeInput!) {
    createRecipe(input: $input) {
      id
      name
      description
    }
  }
`

const AddrecipePage = () => {
  const formMethods = useForm();

  const [fileUrl, setFileUrl] = React.useState(null);

  const [create, { loading, error }] = useMutation(CREATE_RECIPE, {
    onCompleted: () => {
      alert('Thank you for your submission!')
      formMethods.reset()
      navigate('/');
    },
  })

  const onSubmit = (data) => {

    let value = {
      name: data.name,
      description: data.description,
      image_url: fileUrl
    }

    create({ variables: { input: value } })
  }

  const handleChange = async (e) => {
    const data = new FormData()
    data.append("file", e?.target?.files[0])
    data.append("upload_preset", 'ordzpaf3')

    const res = await fetch("https://api.cloudinary.com/v1_1/karthick30/image/upload", {
      method: "POST",
      body: data,
    })

    const file = await res.json()


    setFileUrl(file.secure_url);

  }

  return (
    <div className="form-div">
      <h1>Add Recipe</h1>
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
              className ="text-field"

            />
            <FieldError name="description" className="error" />
          </div>
          <div>
            <input type="file" onChange={handleChange} />
          </div>

          <div className="submit-btn">
            <Submit>Save</Submit>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default AddrecipePage
