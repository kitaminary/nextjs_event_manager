import { Header } from "./Header";
import styles from "../styles/Loyout.module.scss"

const Loyout = ({ children }) => (
    <div className={styles.loyout}>
        <Header />
        <main>{children}</main>
    </div>
)

export default Loyout