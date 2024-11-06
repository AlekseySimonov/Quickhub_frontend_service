import {icons} from '../../../../shared/ui/icons/header'
export const Search = ({ testid, styles, placeholder})=>{
    return(
        <>
        <div data-testid={testid} className={styles.search}>
            <img className={styles.search_icon} src={icons.search}/>
            <input type="text" placeholder={placeholder} />
        </div>
    </>
    )
}
