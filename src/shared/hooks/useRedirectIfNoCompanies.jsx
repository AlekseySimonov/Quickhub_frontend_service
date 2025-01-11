import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useRedirectIfNoCompanies = (params = {}) => {
    const { companiesList, companyID, createCompanyPopup  } = params || {}
    const navigate = useNavigate();
    const location = useLocation()

    useEffect(() => {
        console.log("Companies list:", Array.isArray(companiesList));
        console.log("Company ID:", companyID);
        console.log("Companies list:", companiesList);
        if (!companyID) {
            if (!location.pathname.includes("/companies")) {
                navigate("/companies");
                return
            }
            if (!Array.isArray(companiesList) || companiesList.length === 0) {
                console.log("Opening popup because companiesList is empty");
                if (createCompanyPopup && typeof createCompanyPopup.openPopup === 'function') {
                    console.log("Opening popup because companiesList is empty");
                    createCompanyPopup.openPopup();
                }
            }
        } 
    }, [companiesList, navigate, createCompanyPopup, companyID, location.pathname]);
};