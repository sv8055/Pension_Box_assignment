import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AuthContext } from '../../context/authentication/authContextProvider';
import Login from './index';

describe('Login', () => {
  const mockLogin = jest.fn();
  const setup = () => (
    <AuthContext.Provider value={{ login: mockLogin }}>
      <Login />
    </AuthContext.Provider>
  );

  it('should render the Login component', () => {
    render(setup());
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('should update email input when user types', () => {
    render(setup());
    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
  });

  it('should update password input when user types', () => {
    render(setup());
    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput.value).toBe('password123');
  });

  it('should show error message when email is invalid', () => {
    render(setup());
    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.submit(screen.getByRole('button', { name: 'Login' }));
    expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument();
  });

  it('should show error message when password is too short', () => {
    render(setup());
    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(passwordInput, { target: { value: '12345' } });
    fireEvent.submit(screen.getByRole('button', { name: 'Login' }));
    expect(screen.getByText('Password must be at least 6 characters long.')).toBeInTheDocument();
  });

  it('should call login function with correct email and password', () => {
    render(setup());
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.submit(screen.getByRole('button', { name: 'Login' }));
    expect(mockLogin).toHaveBeenCalledWith({ email: 'test@example.com', username: 'test', password: 'password123' });
  });
});
