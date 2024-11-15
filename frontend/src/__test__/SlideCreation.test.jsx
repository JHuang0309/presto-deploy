import { fireEvent, render, screen, waitFor, cleanup } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { describe, expect, it } from "vitest";
import { BrowserRouter, useNavigate, Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import PageRegister from '../pages/PageRegister';
import PageDashboard from '../pages/PageDashboard';
import PageCreate from '../pages/PageCreate';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

const mockSetTokenFn = vi.fn();
const mockNavigate = vi.fn();

describe("SlideCreation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    axios.post = vi.fn().mockResolvedValue({ data: { token: 'mockToken' } });
    axios.put = vi.fn().mockResolvedValue({ data: { success: true } });
    vi.mocked(useNavigate).mockImplementation(() => mockNavigate);
    });
    
  it("create slides succesfully", async () => {

    // Succesfully register and get token set up

    render(
      <BrowserRouter>
        <PageRegister setTokenFn={mockSetTokenFn} />
      </BrowserRouter>
    );
  
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

    render(
      <BrowserRouter>
        <PageDashboard token={'mockToken'} />
      </BrowserRouter>
    );

    // Succesfully create a presentation

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

    const presentation = screen.getByText("Test Presentation");
    waitFor(() => {
      fireEvent.click(presentation);
    })
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

    render(
      <Router location={history.location} navigator={history}>
        <Routes>
          <Route path="/create/:presentationId/:slideNumber" element={<PageCreate />} />
        </Routes>
      </Router>
    );

    // Succesfully add slides

    const addButton = screen.getByRole('button', { name: /Create new slide/i });
    const slideIndexSpan = screen.getByTestId('slide-index');
    await waitFor(() => {
      expect(slideIndexSpan).toHaveTextContent('1');
    });
    await waitFor(() => {
      fireEvent.click(addButton);
      fireEvent.click(addButton);
      fireEvent.click(addButton);
      fireEvent.click(addButton);
    })
    await waitFor(() => {
      expect(slideIndexSpan).toHaveTextContent('5');
    });

    // Succesfully delete slides

    const deleteButton = screen.getByRole('button', { name: /^Delete slide$/i });
    await waitFor(() => {
      fireEvent.click(deleteButton);
      fireEvent.click(deleteButton);
      fireEvent.click(deleteButton);
    })
    await waitFor(() => {
      expect(slideIndexSpan).toHaveTextContent('2');
    });

  });
});