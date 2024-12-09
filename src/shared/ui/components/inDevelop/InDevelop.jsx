import styles from "./styles.module.css"
import { generalIcons } from "../../icons/general"

export const InDevelop = () => {
    return (
        <div className= {styles.develop}>
            <img src={generalIcons.inDevelop}/>
            <p>Данная страница находится в разработке</p>
        </div>
    )
}
