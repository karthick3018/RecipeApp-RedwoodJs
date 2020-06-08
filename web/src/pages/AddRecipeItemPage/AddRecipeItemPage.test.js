import { render, cleanup } from '@redwoodjs/testing'

import AddRecipeItemPage from './AddRecipeItemPage'

describe('AddRecipeItemPage', () => {
  afterEach(() => {
    cleanup()
  })
  it('renders successfully', () => {
    expect(() => {
      render(<AddRecipeItemPage />)
    }).not.toThrow()
  })
})
