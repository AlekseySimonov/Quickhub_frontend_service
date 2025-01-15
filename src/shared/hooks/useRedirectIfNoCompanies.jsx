import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetCompaniesQuery } from "../../app/store/slices/companySlice";

export const useRedirectIfNoCompanies = (params = {}) => {
    const { companyID, createCompanyPopup } = params;
    const navigate = useNavigate();
    const location = useLocation();
    const { data: companiesList, isSuccess } = useGetCompaniesQuery();

    useEffect(() => {
        if (!companyID && isSuccess) {
            if (!location.pathname.includes("/companies")) {
                navigate("/companies");
                return;
            }

            if (!Array.isArray(companiesList) || companiesList.length === 0) {
                createCompanyPopup?.openPopup?.();
            }
        }
    }, [companiesList, navigate, createCompanyPopup, companyID, location.pathname, isSuccess]);
};