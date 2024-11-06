import { render, screen} from "@testing-library/react"
import { CompaniesHeader } from "../../../src/widgets/companies/ui/CompaniesHeader"

const companyHeader = () => {
    return(
     <CompaniesHeader>
    </CompaniesHeader>   
    )
    
}

describe('Header', ()=>{
    test('select', () =>{
        render(companyHeader)
        const select = screen.getByTestId('selecting-select')
        expect(select).toBeInTheDocument()
    })
})