import { useGetCompaniesQuery, useGetDepartmentsQuery } from "../../app/store/slices/companySlice";
import { useGetUserInfoQuery } from "../../app/store/slices/userSlice";

export const useGlobalLoading = () => {
    const { isFetching: isCompaniesLoading } = useGetCompaniesQuery();
    const { isFetching: isDepartmentsLoading } = useGetDepartmentsQuery();
    const { isFetching: isUserInfoLoading } = useGetUserInfoQuery();

    return isCompaniesLoading ||
    isDepartmentsLoading ||
    isUserInfoLoading
};