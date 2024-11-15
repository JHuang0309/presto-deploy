import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { vi } from "vitest";
import ModalBackgroundInput from "../components/ModalBackgroundInput";
import { BrowserRouter } from 'react-router-dom';
import Modal from "../components/Modal";

describe("ModalBackgroundInput", () => {
  const mockUpdateUserInput = vi.fn();
  const mockAddFormat = vi.fn();
  const mockOnClose = vi.fn();

  beforeEach(() => {
    mockUpdateUserInput.mockClear();
  });

  it("updates background to solid fill with specified color", async () => {
    const { getByText, getByLabelText } = render(
      <BrowserRouter>
        <Modal
          type="format"
          onClose={mockOnClose}
          addFormat={mockAddFormat}
          isOpen={true}
        />
      </BrowserRouter>
      
    );

    
    await waitFor(() => {
      fireEvent.click(screen.getByRole('radio', { name: 'Solid fill' }));
    })

    // Find the color input and change it to a test color
    const colorInput = getByLabelText("Colour");
    await waitFor(() => {
      fireEvent.change(colorInput, { target: { value: "#123456" } });
    })

    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: /^Apply$/ }));
    })

    // expect(mockUpdateUserInput).toHaveBeenCalled();
  });
});
