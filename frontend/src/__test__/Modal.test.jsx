import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Modal from '../components/Modal';
import { BrowserRouter } from 'react-router-dom';

const mockAddTextbox = vi.fn();
const mockOnClose = vi.fn();

describe('Modal component with text input type', () => {
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
});    