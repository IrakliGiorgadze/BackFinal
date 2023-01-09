import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders title', () => {
  render(<App />);
  const title = screen.getByText(/EnergyAustralia - Coding Challenge/i);
  expect(title).toBeInTheDocument();

  const call_api_btn = screen.getByTestId('call-api-btn');

  //interact with those elements
  fireEvent.click(call_api_btn);

  //assert the expected result
});
