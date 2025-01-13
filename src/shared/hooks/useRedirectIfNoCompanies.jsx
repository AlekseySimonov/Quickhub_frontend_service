import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export const useRedirectIfNoCompanies = (params = {}) => {
    const { companiesList, companyID, createCompanyPopup  } = params || {}
    const navigate = useNavigate()
    const location = useLocation()
    const status = useSelector(state => state.company.status)

    useEffect(() => {
        if (!companyID) {
            if (!location.pathname.includes("/companies")) {
                navigate("/companies");
                return
            }
            if (!Array.isArray(companiesList) || companiesList.length === 0 || status === 'succeeded') {
                if (createCompanyPopup && typeof createCompanyPopup.openPopup === 'function') {
                    console.log("Opening popup because companiesList is empty");
                    createCompanyPopup.openPopup();
                }
            }
        } 
    }, [companiesList, navigate, createCompanyPopup, companyID, location.pathname,status]);
};