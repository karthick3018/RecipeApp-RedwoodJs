import { render, cleanup } from '@redwoodjs/testing'

import RecipelistPage from './RecipelistPage'

describe('RecipelistPage', () => {
  afterEach(() => {
    cleanup()
  })
  it('renders successfully', () => {
    expect(() => {
      render(<RecipelistPage />)
    }).not.toThrow()
  })
})
