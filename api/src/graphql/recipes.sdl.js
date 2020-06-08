export const schema = gql`
  type Recipe {
    id: Int!
    name: String!
    description: String!
    image_url: String!
  }

  type Query {
    recipes: [Recipe!]!
    recipe(id: Int!): Recipe!
  }

  input CreateRecipeInput {
    name: String!
    description: String!
    image_url: String!
  }

  input UpdateRecipeInput {
    name: String
    description: String
    image_url: String
  }

  type Mutation {
    createRecipe(input: CreateRecipeInput!): Recipe!
    updateRecipe(id: Int!, input: UpdateRecipeInput!): Recipe!
    deleteRecipe(id: Int!): Recipe!
  }
`
