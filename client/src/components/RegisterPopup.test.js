import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from '../contexts/UserContext';
import RegisterPopup from './RegisterPopup';

// Mock UserContext
const mockRegister = jest.fn();
jest.mock('../contexts/UserContext', () => ({
  ...jest.requireActual('../contexts/UserContext'),
  useUserContext: () => ({
    register: mockRegister,
  }),
}));

test('renders RegisterPopup and submits register form', async () => {
  const closePopup = jest.fn();
  mockRegister.mockResolvedValue({ success: true });

  await act(async () => {
    render(
      <UserProvider>
        <RegisterPopup closePopup={closePopup} />
      </UserProvider>
    );
  });

  fireEvent.change(screen.getByPlaceholderText(/nazwa użytkownika/i), { target: { value: 'testuser' } });
  fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'test@test.com' } });
  fireEvent.change(screen.getByPlaceholderText(/^hasło$/i), { target: { value: 'password' } });
  fireEvent.change(screen.getByPlaceholderText(/powtórz hasło/i), { target: { value: 'password' } });

  await act(async () => {
    fireEvent.click(screen.getByText(/zarejestruj się/i));
  });

  expect(closePopup).toHaveBeenCalled();
});
