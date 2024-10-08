import styles from './styles.module.css'

const ContentHeader = (props)=>{

    return(
        <div className={styles.content_header}>
            <div className = {styles.content_name}>
                {props.contentName}
            </div>

            <div className={styles.tools}>
            
                <div className= {styles.nav_bar}>
                    {props.nav}
                </div>

                <div className={styles.tool_bar}>
                    {props.tools}
                </div>
            </div>
        </div>
    )
}

export {ContentHeader}