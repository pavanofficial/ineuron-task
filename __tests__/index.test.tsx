import { render, screen } from '@testing-library/react'
import "@testing-library/jest-dom";
import Home from '../src/pages/index'

it('renders homepage unchanged', () => {
  const { container } = render(<Home />)
  expect(container).toMatchSnapshot()
})

describe("Home", () => {
    it("renders the stock market scan listing", () => {
      render(<Home />);
      expect(screen.getByTestId("cardBox")).toBeInTheDocument();
      expect(screen.getByTestId("listing")).toBeInTheDocument();
    })
})