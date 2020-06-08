import { render, cleanup } from '@redwoodjs/testing'

import EditRecipeItemPage from './EditRecipeItemPage'

describe('EditRecipeItemPage', () => {
  afterEach(() => {
    cleanup()
  })
  it('renders successfully', () => {
    expect(() => {
      render(<EditRecipeItemPage />)
    }).not.toThrow()
  })
})
