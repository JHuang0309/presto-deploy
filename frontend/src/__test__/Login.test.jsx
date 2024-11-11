import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from "vitest";
import PageLogin from '../pages/PageLogin';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import axios from 'axios';

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
      ...actual,
      useNavigate: vi.fn(),
    };
});

const mockSetTokenFn = vi.fn();
const mockNavigate = vi.fn();


describe("Login test", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        axios.post = vi.fn();
        vi.mocked(useNavigate).mockImplementation(() => mockNavigate);
    });

    it("renders login form inputs and buttons", () => {
        render(
          <BrowserRouter>
            <PageLogin setTokenFn={mockSetTokenFn} />
          </BrowserRouter>
        );
    
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    it("redirects to dashboard if token is in localStorage", () => {
        // set token in localStorage to simulate logged-in state
        localStorage.setItem('token', 'mockToken');
    
        render(
          <BrowserRouter>
            <PageLogin setTokenFn={mockSetTokenFn} />
          </BrowserRouter>
        );
    
        // verify that navigate to dashboard is called on initial load
        expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
        localStorage.removeItem('token');
    });

    it("calls login API and redirects to dashboard on successful login", async () => {
        // mock axios post to return a successful response
        axios.post.mockResolvedValue({ data: { token: 'mockToken' } });
    
        render(
          <BrowserRouter>
            <PageLogin setTokenFn={mockSetTokenFn} />
          </BrowserRouter>
        );
    
        // enter login credentials
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    
        // click login button
        fireEvent.click(screen.getByRole('button', { name: /login/i }));
    
        // Wait for the async login process to complete
        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('http://localhost:5005/admin/auth/login', {
                email: 'test@example.com',
                password: 'password',
            });
            expect(mockSetTokenFn).toHaveBeenCalledWith('mockToken');
            expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
         });
    });
    it("shows an error alert on failed login", async () => {
        axios.post.mockRejectedValue({
          response: {
            data: { error: 'Invalid credentials' },
          },
        });
    
        render(
          <BrowserRouter>
            <PageLogin setTokenFn={mockSetTokenFn} />
          </BrowserRouter>
        );
    
        // Enter login credentials
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpassword' } });
    
        // Click login button
        fireEvent.click(screen.getByRole('button', { name: /login/i }));
    
        // Wait for the async login process to complete and Alert to show
        await waitFor(() => {
          expect(axios.post).toHaveBeenCalled();
          expect(screen.getByText('Invalid email or password')).toBeInTheDocument();
        });
    });
});
