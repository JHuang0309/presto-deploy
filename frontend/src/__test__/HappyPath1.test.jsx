import { fireEvent, render, screen, waitFor, cleanup } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { describe, expect, it } from "vitest";
import { BrowserRouter, useNavigate, Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import PageRegister from '../pages/PageRegister';
import PageDashboard from '../pages/PageDashboard';
import PageCreate from '../pages/PageCreate';
import Logout from '../components/Logout';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

const mockSetTokenFn = vi.fn();
const mockNavigate = vi.fn();

const thumbnailChangeResponse = await fetch("https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg");
const mockFileReader = {
  result: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K',
  onloadend: null, // Define onloadend as a property we can set later
  readAsDataURL: vi.fn().mockImplementation(function () {
    if (this.onloadend) {
      this.onloadend(); // Call onloadend directly if it is defined
    }
  }),
};

global.FileReader = vi.fn(() => mockFileReader);

describe("Happy path", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    axios.post = vi.fn().mockResolvedValue({ data: { token: 'mockToken' } });
    axios.put = vi.fn().mockResolvedValue({ data: { success: true } });
    global.fetch = vi.fn().mockResolvedValue(thumbnailChangeResponse);
    vi.mocked(useNavigate).mockImplementation(() => mockNavigate);
  });

  it("peforms the happy path successfully", async () => {

    // User register successfully

    render(
      <BrowserRouter>
        <PageRegister setTokenFn={mockSetTokenFn} />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password$/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/)).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/^Password$/), { target: { value: 'password' } });
    fireEvent.change(screen.getByLabelText(/Confirm Password/), { target: { value: 'password' } });
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'test' } });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:5005/admin/auth/register', {
        email: 'test@example.com',
        password: 'password',
        name: 'test',
      });
    });
    await waitFor(() => {
      expect(mockSetTokenFn).toHaveBeenCalledWith('mockToken');
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
    
    cleanup();

    // User creates a presentation successfully

    render(
      <BrowserRouter>
        <PageDashboard token={'mockToken'} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('+')); // Click the "+" button to open the modal
    fireEvent.change(screen.getByLabelText(/Title/), { target: { value: 'Test Presentation' } });
    fireEvent.change(screen.getByLabelText(/Description/), { target: { value: 'Test Presentation Description' } });
    fireEvent.change(screen.getByLabelText(/Thumbnail/), { target: { value: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Vitejs-logo.svg' } });

    fireEvent.click(screen.getByText('Create'));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith('http://localhost:5005/store', {
        store: {
          presentations: [
            {
            id: expect.any(String), // Match any string for id
            title: 'Test Presentation',
            description: 'Test Presentation Description',
            thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Vitejs-logo.svg',
            versions: [
              {
                presentationId: expect.any(String),
                slides: [
                  {
                    elements:[],
                    format: {
                      colour: "#FFFFFF",
                      format: "solid",
                    },
                    id: expect.any(String),
                    presentationId: expect.any(String),
                  },
                  
                ],
                version: expect.any(String),
                versionId: expect.any(String),
              },
            ],
            },
          ],
        },
      }, 
      {
        headers: {Authorization: "Bearer mockToken"}
      },);
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });

//     // User opens presentation and updates the name of the presentation successfully

    const presentation = screen.getByText("Test Presentation");
    fireEvent.click(presentation);
    expect(mockNavigate).toHaveBeenCalledWith(expect.stringContaining('/create/'));
    
    const createPageCall = mockNavigate.mock.calls[1][0];
    const urlParams = new URLSearchParams(createPageCall.split('?')[1]);
    const id = urlParams.get('id');
    
    const history = createMemoryHistory();
    history.push(createPageCall);

    axios.get = vi.fn().mockResolvedValueOnce({ data: { 
      store: {
        presentations: [
          {
          id: id, // Match any string for id
          title: 'Test Presentation',
          description: 'Test Presentation Description',
          thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Vitejs-logo.svg',
          versions: [
            {
              presentationId: id,
              slides: [
                {
                  elements:[],
                  format: {
                    colour: "#FFFFFF",
                    format: "solid",
                  },
                  id: expect.any(String),
                  presentationId: expect.any(String),
                },
                
              ],
              version: expect.any(String),
              versionId: expect.any(String),
            },
          ],
          },
        ],
      },
     } });

    const { unmount } = render(
      <Router location={history.location} navigator={history}>
        <Routes>
          <Route path="/create/:presentationId/:slideNumber" element={<PageCreate />} />
        </Routes>
      </Router>
    );

    

  });
});