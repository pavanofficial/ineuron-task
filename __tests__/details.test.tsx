import { render, screen, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";
import mockRouter from 'next-router-mock';
import Detail from '../src/pages/details/[id]'
jest.mock('next/router', () => require('next-router-mock'));


it('renders homepage unchanged', () => {
  const { container } = render(<Detail />)
  expect(container).toMatchSnapshot()
})

describe('next-router-mock', () => {
    it('mocks the useRouter hook', () => {
      mockRouter.push("/1");
      
      expect(mockRouter).toMatchObject({ 
        asPath: "/1",
        pathname: "/1",
        query: { },
      })
    })
})

describe("Details", () => {
    it("renders the criteria listing", () => {
      render(<Detail />);
      expect(screen.getByTestId("backBtn")).toBeInTheDocument();
      expect(screen.getByTestId("contentBox")).toBeInTheDocument();
      expect(screen.getByTestId("title")).toBeInTheDocument();
      expect(screen.getByTestId("tag")).toBeInTheDocument();
      expect(screen.getByTestId("criteriaListing")).toBeInTheDocument();
    })
})