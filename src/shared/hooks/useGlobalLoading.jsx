import { useSelector } from "react-redux";
import { useGetCompaniesQuery, useGetDepartmentsQuery } from "../../app/store/slices/companySlice";
import { useGetUserInfoQuery } from "../../app/store/slices/userSlice";

export const useGlobalLoading = () => {
    const companyID = useSelector(state => state.company.companyID)
    const { isFetching: isCompaniesLoading } = useGetCompaniesQuery(companyID);
    const { isFetching: isDepartmentsLoading } = useGetDepartmentsQuery(companyID);
    const { isFetching: isUserInfoLoading } = useGetUserInfoQuery();

    return isCompaniesLoading ||
    isDepartmentsLoading ||
    isUserInfoLoading
};