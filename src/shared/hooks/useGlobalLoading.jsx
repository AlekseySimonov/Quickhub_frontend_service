import { useGetCompaniesQuery, useGetDepartmentsQuery } from "../../app/store/slices/companySlice";

export const useGlobalLoading = () => {
    const { isFetching: isCompaniesLoading } = useGetCompaniesQuery();
    const { isFetching: isDepartmentsLoading } = useGetDepartmentsQuery();

    return isCompaniesLoading ||
    isDepartmentsLoading;
};