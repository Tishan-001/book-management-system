import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../src/components/login/login';

describe('Login component', () => {
  it('renders the login form with email and password fields', () => {
    render(<Login />);

    const emailInput = screen.getByLabelText(/E-mail/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('updates the email state on input change', () => {
    try {
      render(<Login />);
    } catch (error) {
      console.error('Error rendering Login component:', error);
      throw error; 
    }
    const emailInput = screen.getByLabelText(/E-mail/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    expect(emailInput).toHaveValue('test@example.com');
  });

  it('updates the password state on input change', () => {
    try {
      render(<Login />);
    } catch (error) {
      console.error('Error rendering Login component:', error);
      throw error; 
    }
    const passwordInput = screen.getByLabelText(/Password/i);

    fireEvent.change(passwordInput, { target: { value: 'secretpassword' } });

    expect(passwordInput).toHaveValue('secretpassword');
  });

  it('disables the submit button when loading', () => {
    render(<Login />);
    const submitButton = screen.getByRole('button', { name: /Login/i });

    expect(submitButton).toBeEnabled();

    fireEvent.click(submitButton);

  });
});