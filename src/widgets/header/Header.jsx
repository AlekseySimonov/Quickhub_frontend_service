import styles from './styles.module.css'
import search from '../../shared/ui/icons/header/search.svg'
import arrow_down from '../../shared/ui/icons/header/arrow_down.svg'
import messages from '../../shared/ui/icons/header/messages.svg'
import notifications from '../../shared/ui/icons/header/notifications.svg'
import profile from '../../shared/ui/icons/header/profile.svg'
import logoSVG from '../../shared/ui/icons/header/logoSVG.svg'
import burger from '../../shared/ui/icons/header/burger.svg'

const Header = ({burgerClick}) => {

    return (
    <>
        <div className={styles.left}>
        
            <button 
                className={styles.burger} 
                onClick={burgerClick} 
                data-testid ='burger-test'
            >
                <img src={burger}/>
            </button>

            <a href="#" className={styles.logo}>
                <img src={logoSVG}/>
                QuickHub
            </a>

            <div className={styles.search}>
                <img src={search}/>
                <input type="text" placeholder="Искать" />
            </div>
        </div>
            


        <div className={styles.right}>

            <a href="" className={styles.notifications}>
                <img src={notifications}/>
            </a>

            <a href="" className={styles.messages}>
                <img src={messages}/>
            </a>

            <button className={styles.account}>
                <div className={styles.profile}>

                    <div className={styles.profile_icon}>
                        <img src={profile}/>
                    </div>

                    <div className={styles.name}>
                        <p>Симонов Алексей</p>
                    </div>
                </div>

                <div className={styles.arrow_down}>
                <img src={arrow_down}/>
                </div>
            </button>

        </div>
    </>
    )
}

export {Header}