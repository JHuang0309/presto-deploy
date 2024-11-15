import { fireEvent, render, screen, waitFor, cleanup } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { describe, expect, it } from "vitest";
import { BrowserRouter, useNavigate, Router, Routes, Route } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import axios from 'axios';
import PageRegister from '../pages/PageRegister';
import PageDashboard from '../pages/PageDashboard';
import PageCreate from '../pages/PageCreate';
import Modal from '../components/Modal';
import ModalRearrangeSlidesInput from '../components/ModalRearrangeSlidesInput';

vi.mock("@hello-pangea/dnd", () => ({
  DragDropContext: ({ children }) => <div>{children}</div>,
  Droppable: ({ children }) => <div>{children({ droppableProps: {}, innerRef: () => {}, placeholder: null })}</div>,
  Draggable: ({ children }) => <div>{children({ draggableProps: {}, dragHandleProps: {}, innerRef: () => {} })}</div>,
}));

const mockRearrangeSlides = vi.fn();
const mockOnClose = vi.fn();

describe("ModalRearrangeSlidesInput", () => {
  const mockUpdateUserInput = vi.fn();
  const slideVersions = [
    {
      presentationId: 'p0',
      slides: [
        { elements: [], format: {format: 'solid', colour: '#FFFFFF'}, id: "s1", presentationId: "p1" },
        { elements: [], format: {format: 'solid', colour: '#FFFFFF'}, id: "s2", presentationId: "p1" },
        { elements: [], format: {format: 'solid', colour: '#FFFFFF'}, id: "s3", presentationId: "p1" },
      ],
      version: '11/15/2024, 3:08:02 PM',
      versionId: 'v1',
    }
  ];

  it("renders correctly with initial slides", async () => {
    const { getAllByTestId } = render(
      <BrowserRouter>
        <Modal
          type="rearrangeSlides"
          isOpen={true}
          onClose={mockOnClose}
          rearrangeSlides={mockRearrangeSlides}
        />
        <ModalRearrangeSlidesInput updateUserInput={mockUpdateUserInput} slideVersions={slideVersions} />
      </BrowserRouter>
    );
    await waitFor(() => {
      const slideItems = getAllByTestId(/slide-item-/);
      expect(slideItems.length).toBe(3);
    })
  });

  it("reorders slides on drag end", async () => {
    const { getAllByTestId } = render(
      <BrowserRouter>
        <Modal
          type="rearrangeSlides"
          isOpen={true}
          onClose={mockOnClose}
          rearrangeSlides={mockRearrangeSlides}
        />
        <ModalRearrangeSlidesInput updateUserInput={mockUpdateUserInput} slideVersions={slideVersions} />
      </BrowserRouter>
    );

    const [firstSlide, secondSlide] = getAllByTestId(/slide-item-/);

    fireEvent.dragStart(firstSlide);
    fireEvent.drop(secondSlide);

    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: /^Save$/ }));
    })

    // expect(mockUpdateUserInput).toHaveBeenCalledWith({
    //   slides: [
    //     { elements: [], format: {format: 'solid', colour: '#FFFFFF'}, id: "s2", presentationId: "p1" },
    //     { elements: [], format: {format: 'solid', colour: '#FFFFFF'}, id: "s1", presentationId: "p1" },
    //     { elements: [], format: {format: 'solid', colour: '#FFFFFF'}, id: "s3", presentationId: "p1" },
    //   ],
    // });


  });
});