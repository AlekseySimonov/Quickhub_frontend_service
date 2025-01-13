import { useGetCompaniesQuery, useGetDepartmentsQuery } from "../../app/store/slices/companySlice";
import { useGetProjectsQuery } from "../../app/store/slices/projectsSlice";

export const useGlobalLoading = () => {
    const { isLoading: isCompaniesLoading } = useGetCompaniesQuery();
    const { isLoading: isUsersCompanyLoading } = useGetProjectsQuery();
    const { isLoading: isDepartmentsLoading } = useGetDepartmentsQuery();

    return isCompaniesLoading || isUsersCompanyLoading || isDepartmentsLoading;
};