import { renderHook, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useRedirectIfNoCompanies } from "../../../../src/shared/hooks";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
    useLocation: jest.fn(),
    }));

    describe("useRedirectIfNoCompanies", () => {
    const mockNavigate = jest.fn();
    const mockOpenPopup = jest.fn();
    const mockClosePopup = jest.fn();
    const mockLocation = { pathname: "/dashboard" };

    beforeEach(() => {
        jest.clearAllMocks();
        require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);
        require("react-router-dom").useLocation.mockReturnValue(mockLocation);
    });

    const setupHook = (params) => {
        return renderHook(() => useRedirectIfNoCompanies(params), {
        wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>,
        });
    };

    it("should navigate to '/companies' if companyID is missing and path is not '/companies'", async () => {
        setupHook({
        companiesList: [],
        companyID: null,
        createCompanyPopup: { openPopup: mockOpenPopup, closePopup: mockClosePopup },
        });

        await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith("/companies");
        });
    });

    it("should open popup if companiesList is empty", async () => {
        setupHook({
        companiesList: [],
        companyID: null,
        createCompanyPopup: { openPopup: mockOpenPopup, closePopup: mockClosePopup },
        });

        await waitFor(() => {
        expect(mockOpenPopup).toHaveBeenCalled();
        expect(mockClosePopup).not.toHaveBeenCalled();
        });
    });

    it("should not navigate or call popup functions if companyID exists", async () => {
        setupHook({
            companiesList: [{ id: 1, title: "Company A" }],
            companyID: 1,
            createCompanyPopup: { openPopup: mockOpenPopup, closePopup: mockClosePopup },
            });

        await waitFor(() => {
            expect(mockNavigate).not.toHaveBeenCalled();
            expect(mockOpenPopup).not.toHaveBeenCalled();
            expect(mockClosePopup).not.toHaveBeenCalled();
        });
    });
});