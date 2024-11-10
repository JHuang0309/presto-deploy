import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Modal from '../components/Modal';
import { BrowserRouter } from 'react-router-dom';

const mockAddTextbox = vi.fn();
const mockOnClose = vi.fn();
const mockAddImage = vi.fn();

describe('Modal component with different input types', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the textbox-type modal and handles input correctly', async () => {

        render(
            <BrowserRouter>
                <Modal
                    type="textbox"
                    isOpen={true}
                    onClose={mockOnClose}
                    addTextbox={mockAddTextbox}
                />
            </BrowserRouter>
        );

        // check all input fields are rendered
        expect(screen.getByLabelText(/Width \(px\)/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Height \(px\)/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Enter text/i)).toBeInTheDocument();

        expect(screen.getByLabelText(/Font Size \(em\)/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Font Colour \(HEX\)/i)).toBeInTheDocument();

        // simulate user input
        fireEvent.change(screen.getByLabelText(/Width \(px\)/i), { target: { value: '100' } });
        fireEvent.change(screen.getByLabelText(/Height \(px\)/i), { target: { value: '50' } });
        fireEvent.change(screen.getByLabelText(/Enter text/i), { target: { value: 'Sample text' } });
        fireEvent.change(screen.getByLabelText(/Font Size \(em\)/i), { target: { value: '1.5' } });
        fireEvent.change(screen.getByLabelText(/Font Colour \(HEX\)/i), { target: { value: '#FF5733' } });

        fireEvent.click(screen.getByRole('button', { name: /Add/i }));
        await waitFor(() => {
            expect(mockAddTextbox).toHaveBeenCalledWith({
                width: '100',
                height: '50',
                text: 'Sample text',
                fontSize: '1.5',
                colour: '#FF5733',
            });
    
            // check onClose is called after processing inputs
            expect(mockOnClose).toHaveBeenCalled();
        });
        
    });

    // it('renders the image-type modal and handles input correctly', async () => {
    //     render(
    //         <BrowserRouter>
    //             <Modal
    //                 type="image"
    //                 isOpen={true}
    //                 onClose={mockOnClose}
    //                 addImage={mockAddImage}
    //             />
    //         </BrowserRouter>
    //     );

    //     // check all input fields are rendered
    //     expect(screen.getByLabelText(/Width \(px\)/i)).toBeInTheDocument();
    //     expect(screen.getByLabelText(/Height \(px\)/i)).toBeInTheDocument();
    //     expect(screen.getByLabelText(/Enter Image/i)).toBeInTheDocument();
    //     expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();

    //     // simulate user input
    //     fireEvent.change(screen.getByLabelText(/Width \(px\)/i), { target: { value: '200' } });
    //     fireEvent.change(screen.getByLabelText(/Height \(px\)/i), { target: { value: '300' } });
    //     fireEvent.change(screen.getByLabelText(/Enter Image/i), { target: { value: 'http://example.com/image.jpg' } });
    //     fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'An example image' } });

    //     // const fileInput = screen.getByLabelText(/Enter Image/i).nextSibling;
    //     // const file = new File(['sample'], 'image.jpg', { type: 'image/jpeg' });
    //     // fireEvent.change(fileInput, { target: { files: [file] } });
    //     // // Check that the URL input is cleared when a file is selected
    //     // await waitFor(() => {
    //     //     expect(screen.getByLabelText(/Enter Image/i).value).toBe(''); // check URL input is cleared
    //     // });


    //     fireEvent.click(screen.getByRole('button', { name: /Add/i }));
    //     await waitFor(() => {
    //         expect(mockAddImage).toHaveBeenCalledWith(expect.objectContaining({
    //             width: '200',
    //             height: '300',
    //             image: expect.any(String),  // expect base64 string from file conversion
    //             description: 'An example image',
    //         }));
    //     });
        
    // });
});    