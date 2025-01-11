import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetErrorState } from "../../app/store/slices/authSlice";

export const useResetErrorState = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetErrorState());
    }, [dispatch]);
};
