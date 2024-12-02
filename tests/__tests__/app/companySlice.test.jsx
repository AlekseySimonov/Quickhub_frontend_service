import reducer, { 
    setCompanyID, 
    checkCompanyID, 
    changeCompany, 
    getCompaniesAPI,
    postCompanyAPI,
    deleteCompanyAPI,
    renameCompanyAPI,
    getDepartmentsAPI,
  } from '../../../src/app/store/slices/companySlice';
  import { companiesService } from '../../../src/shared/api/companiesService'
  
  jest.mock('../../../src/shared/api/companiesService');
  
  describe('companySlice', () => {
    const initialState = {
      companiesList: [],
      companyID: null,
      companyTitle: null,
      companyDescription: null,
      companyUsers: [],
      departments: [],
      status: 'loading',
      error: null,
    };
  
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState);
    });
  
    it('should handle setCompanyID', () => {
      const state = {
        ...initialState,
        companiesList: [{ id: 1, title: 'Test Company' }],
      };
      expect(reducer(state, setCompanyID())).toEqual({
        ...state,
        companyID: 1,
        companyTitle: 'Test Company',
      });
    });
  
    it('should handle checkCompanyID when ID exists', () => {
      const state = {
        ...initialState,
        companiesList: [{ id: 1, title: 'Test Company' }],
        companyID: 1,
      };
      expect(reducer(state, checkCompanyID())).toEqual(state);
    });
  
    it('should handle changeCompany', () => {
      const action = changeCompany({ id: 1, title: 'New Title' });
      expect(reducer(initialState, action)).toEqual({
        ...initialState,
        companyID: 1,
        companyTitle: 'New Title',
      });
    });
  
    describe('async actions', () => {
      it('should handle getCompaniesAPI.fulfilled', async () => {
        const mockCompanies = [{ id: 1, title: 'Test Company' }];
        companiesService.getCompanies.mockResolvedValue({ data: mockCompanies });
  
        const action = await getCompaniesAPI.fulfilled(mockCompanies);
        const state = reducer(initialState, action);
  
        expect(state).toEqual({
          ...initialState,
          status: 'succeeded',
          companiesList: mockCompanies,
        });
      });
  
      it('should handle postCompanyAPI.fulfilled', async () => {
        const newCompany = { id: 2, title: 'New Company' };
        companiesService.postCompany.mockResolvedValue({ data: newCompany });
  
        const action = await postCompanyAPI.fulfilled(newCompany);
        const state = reducer(initialState, action);
  
        expect(state).toEqual({
          ...initialState,
          status: 'succeeded',
          companiesList: [newCompany],
          companyID: newCompany.id,
          companyTitle: newCompany.title,
        });
      });
  
      it('should handle deleteCompanyAPI.fulfilled', async () => {
        const initialTestState = {
          ...initialState,
          companiesList: [{ id: 1, title: 'Test Company' }],
        };
        
        const action = await deleteCompanyAPI.fulfilled(1);
        const state = reducer(initialTestState, action);
  
        expect(state).toEqual({
          ...initialTestState,
          status: 'succeeded',
          companiesList: [],
        });
      });
  
      it('should handle renameCompanyAPI.fulfilled', async () => {
        const initialTestState = {
          ...initialState,
          companiesList: [{ id: 1, title: 'Old Title' }],
        };
        
        const action = await renameCompanyAPI.fulfilled({ id: 1, title: 'New Title' });
        const state = reducer(initialTestState, action);
  
        expect(state).toEqual({
          ...initialTestState,
          status: 'succeeded',
          companiesList: [{ id: 1, title: 'New Title' }],
          companyTitle: 'New Title',
        });
      });
      
      it('should handle getDepartmentsAPI.fulfilled', async () => {
        const mockDepartments = [{ id: 1, name: 'HR' }];
        companiesService.getDepartments.mockResolvedValue({ data: mockDepartments });
  
        const action = await getDepartmentsAPI.fulfilled(mockDepartments);
        const state = reducer(initialState, action);
  
        expect(state).toEqual({
          ...initialState,
          status: 'succeeded',
          departments: mockDepartments,
        });
      });
    });
  });
  