import { render, screen, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";
import mockRouter from 'next-router-mock';
import Variable from '../src/pages/variable/[...slug]'
jest.mock('next/router', () => require('next-router-mock'));


it('renders homepage unchanged', () => {
  const { container } = render(<Variable />)
  expect(container).toMatchSnapshot()
})

describe('next-router-mock', () => {
    it('mocks the useRouter hook', () => {
      mockRouter.push("/$1/0/2");
      
      // Ensure the router was updated:
      expect(mockRouter).toMatchObject({ 
        asPath: "/$1/0/2",
        pathname: "/$1/0/2",
        query: { },
      })
    })
})

describe("Details", () => {
    it("renders the criteria listing", () => {
      render(<Variable />);
      expect(screen.getByTestId("backBtn")).toBeInTheDocument();
      expect(screen.getByTestId("contentBox")).toBeInTheDocument();
      expect(screen.getByTestId("title")).toBeInTheDocument();
    })
})