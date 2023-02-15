
import { act, fireEvent, render, screen } from "@testing-library/react";
import Contributors from "./Contributors";
import useContributors from "../customHooks/useContributors";

const mockedUseContributors = useContributors as jest.Mock<any>; 

jest.mock("../customHooks/useContributors");

describe("<Contributors />", () => {
	beforeEach(() => {
		mockedUseContributors.mockImplementation(() => ({
            data: undefined,
            error: undefined,
            isError: false,
            isLoading: false,
            isSuccess: false,
        }));
        jest.useFakeTimers();
	});
	afterEach(() => {
		jest.clearAllMocks();
        jest.useRealTimers();
	});

	it("Renders without crashing", () => {
		const { container } = render(<Contributors />);
        expect(container).toContainElement(document.querySelector('form'));
		expect(useContributors).toHaveBeenCalledWith('', '');
	});

	it("Fetches facebook/github contributors", async () => {
		const { getByTestId, rerender } = render(<Contributors />);

        act(() => {
            fireEvent.change(getByTestId('repository'), { target: { value: 'react' }});
            fireEvent.change(getByTestId('username'), { target: { value: 'facebook' }});
        });

        rerender(<Contributors />);
        expect(screen.getByDisplayValue('facebook')).toBeInTheDocument();
        expect(screen.getByDisplayValue('react')).toBeInTheDocument();
        
        mockedUseContributors.mockImplementation(() => ({
            data: ['https://github.com/ejubkadric94'],
            error: undefined,
            isError: false,
            isLoading: false,
            isSuccess: true,
        }));

        act(() => jest.advanceTimersByTime(600));
        expect(screen.getByTestId('list')).toBeInTheDocument();
	});

	it("Displays loading", () => {
        mockedUseContributors.mockImplementation(() => ({
            data: undefined,
            error: undefined,
            isError: false,
            isLoading: true,
            isSuccess: false,
        }));
		const { getByText } = render(<Contributors />);

		expect(getByText('Loading...')).toBeInTheDocument();
	});
});