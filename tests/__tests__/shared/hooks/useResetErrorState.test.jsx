import { renderHook } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { useResetErrorState } from './../../../../src/shared/hooks/useResetErrorState';
import { resetErrorState } from "../../../../src/app/store/slices/authSlice";

jest.mock("react-redux", () => ({
    useDispatch: jest.fn(),
}));

jest.mock("../../../../src/app/store/slices/authSlice", () => ({
    resetErrorState: jest.fn(),
}));

describe("useResetErrorState", () => {
    test("dispatches resetErrorState on mount", () => {
        const dispatch = jest.fn();
        useDispatch.mockReturnValue(dispatch);

        renderHook(() => useResetErrorState());

        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(resetErrorState());
    });
});