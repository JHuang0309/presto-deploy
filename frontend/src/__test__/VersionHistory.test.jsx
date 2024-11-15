import { render, screen, fireEvent } from "@testing-library/react";
import ModalVersionInput from "../components/ModalVersionInput";

describe("ModalVersionInput", () => {
  const mockUpdateUserInput = vi.fn();
  const slideVersions = [
    {
      presentationId: 'p0',
      slides: [{
        elements: [],
        format: {format: 'solid', colour: '#FFFFFF'},
        id: "s0",
        presentationId: "p0"
      }],
      version: '11/15/2024, 1:08:02 PM',
      versionId: 'v0',
    },
    {
      presentationId: 'p0',
      slides: [
        { elements: [], format: {format: 'solid', colour: '#FFFFFF'}, id: "s1", presentationId: "p1" },
        { elements: [], format: {format: 'solid', colour: '#FFFFFF'}, id: "s2", presentationId: "p1" },
        { elements: [], format: {format: 'solid', colour: '#FFFFFF'}, id: "s3", presentationId: "p1" },
        { elements: [], format: {format: 'solid', colour: '#FFFFFF'}, id: "s4", presentationId: "p1" },
        { elements: [], format: {format: 'solid', colour: '#FFFFFF'}, id: "s5", presentationId: "p1" },
      ],
      version: '11/15/2024, 3:08:02 PM',
      versionId: 'v1',
    }
  ];

  it("renders the correct number of versions", () => {
    render(<ModalVersionInput updateUserInput={mockUpdateUserInput} slideVersions={slideVersions} />);
    const versionItems = screen.getAllByRole("listitem");
    expect(versionItems.length).toBe(slideVersions.length);
  });

  it("displays the correct version details", () => {
    render(<ModalVersionInput updateUserInput={mockUpdateUserInput} slideVersions={slideVersions} />);
    slideVersions.forEach((version, index) => {
      expect(screen.getByText(`Version ${index + 1} - ${version.version}`)).toBeInTheDocument();
      expect(screen.getByText(`Slides: ${version.slides.length}`)).toBeInTheDocument();
    });
  });

  it("calls updateUserInput when a version is selected", () => {
    render(<ModalVersionInput updateUserInput={mockUpdateUserInput} slideVersions={slideVersions} />);
    const firstRadio = screen.getByTestId("0");
    fireEvent.click(firstRadio);
    expect(mockUpdateUserInput).toHaveBeenCalledWith(expect.any(Function));

    // verify updateUserInput (with chosen version) was called with version v0
    const updateCall = mockUpdateUserInput.mock.calls[0][0];
    const updatedInput = updateCall({});
    expect(updatedInput).toEqual({ version: "v0" });
  });

  it("renders nothing if slideVersions is undefined", () => {
    const { container } = render(<ModalVersionInput updateUserInput={mockUpdateUserInput} slideVersions={undefined} />);
    expect(container.firstChild).toBeNull();
  });
});
