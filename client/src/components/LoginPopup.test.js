import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from '../contexts/UserContext';
import LoginPopup from './LoginPopup';

// Mock UserContext
const mockLogin = jest.fn();
jest.mock('../contexts/UserContext', () => ({
  ...jest.requireActual('../contexts/UserContext'),
  useUserContext: () => ({
    login: mockLogin,
  }),
}));

test('renders LoginPopup and submits login form', async () => {
  const closePopup = jest.fn();
  mockLogin.mockResolvedValue({ success: true });

  await act(async () => {
    render(
      <UserProvider>
        <LoginPopup closePopup={closePopup} />
      </UserProvider>
    );
  });

  fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'test@test.com' } });
  fireEvent.change(screen.getByPlaceholderText(/hasło/i), { target: { value: 'password' } });

  await act(async () => {
    fireEvent.click(screen.getByText(/zaloguj się/i));
  });

  expect(closePopup).toHaveBeenCalled();
});
