import { ChooseCompany } from '../../shared/ui/components/companies'
import { ContentHeader } from '../../shared/ui/components/ContentHeader'
// import styles from './styles.module.css'

const CompaniesHeader = ()=>{

    return(
        <>
            <ContentHeader
                contentName = <ChooseCompany/>
                nav = ''
                tools = ''
            />
        </>
    )
}

export {CompaniesHeader}