import { renderHook, act } from "@testing-library/react";
import { usePopup } from "../../../../src/shared/hooks/usePopup";


describe("usePopup", () => {
    test("initialize with isVisible set to false", () => {
        const { result } = renderHook(() => usePopup());

        expect(result.current.isVisible).toBe(false);
    });

    test("set isVisible to true when openPopup is called", () => {
    const { result } = renderHook(() => usePopup());

    act(() => {
        result.current.openPopup();
    });

    expect(result.current.isVisible).toBe(true);
    });

    test("set isVisible to false when closePopup is called", () => {
    const { result } = renderHook(() => usePopup());

    act(() => {
        result.current.openPopup();
        result.current.closePopup();
        });

        expect(result.current.isVisible).toBe(false);
    });
});