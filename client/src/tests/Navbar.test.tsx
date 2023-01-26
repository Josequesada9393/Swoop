/* eslint-disable jest/valid-expect */
import { render, screen } from '@testing-library/react';
import Navbar from '../components/Navbar';
import { MockItem } from './mockFetch';


test('display first layer navbar correctly', () => {
  render(<Navbar items={[MockItem]}/>)
  expect(screen.getByTestId('swooplogo')).toBeInTheDocument()
  expect(screen.getByTestId('searchbar')).toBeInTheDocument()
})

test('renders sell now button', () => {
   render(<Navbar items={[MockItem]} />);

  const sellNow = screen.getByText('Sell Now', {exact: false})
  expect(sellNow).toBeInTheDocument();

})

test('renders login button', () => {
   render(<Navbar items={[MockItem]} />);
  const login = screen.getAllByText('Log In/ Register', {exact: false})
  expect(login[0]).toBeInTheDocument()

})









