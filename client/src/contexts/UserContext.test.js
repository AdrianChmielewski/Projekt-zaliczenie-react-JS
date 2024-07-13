import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserProvider, UserContext } from './UserContext';

test('register function should return success', async () => {
  const mockRegister = jest.fn().mockResolvedValue({ success: true });

  jest.spyOn(React, 'useContext').mockImplementation(() => ({
    register: mockRegister,
  }));

  const { result } = await mockRegister('testuser', 'test@test.com', 'password');
  expect(result.success).toBeTruthy();
});

test('login function should set user', async () => {
  const mockLogin = jest.fn().mockResolvedValue({ success: true, user: { username: 'testuser' }, token: 'testtoken' });
  const setUser = jest.fn();

  jest.spyOn(React, 'useContext').mockImplementation(() => ({
    login: mockLogin,
    setUser,
  }));

  const { result } = await mockLogin('test@test.com', 'password');
  expect(result.success).toBeTruthy();
  expect(setUser).toHaveBeenCalledWith({ username: 'testuser' });
});
