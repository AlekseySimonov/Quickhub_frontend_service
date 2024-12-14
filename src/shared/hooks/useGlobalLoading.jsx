import { useSelector } from 'react-redux';

export const useGlobalLoading = () => {
    const isLoadingQueries = useSelector((state) =>
        Object.values(state.departments.queries).some(query => query?.status === 'pending')
    );

    const isLoadingMutations = useSelector((state) =>
        Object.values(state.departments.mutations).some(mutation => mutation?.status === 'pending')
    );

    return isLoadingQueries || isLoadingMutations;
};