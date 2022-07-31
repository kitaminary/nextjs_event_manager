import "../styles/globals.css";
import Loyout from "../components/Loyout";
import PostList from "../components/PostList";
import styles from "../styles/PostList.module.scss";
import { Timezone } from "../providers/Timezone";


const MyApp = ({ Component, pageProps }) => (
  <div>
    <Timezone>
      <Loyout>
        <Component {...pageProps} />
        <PostList className={styles.PostList} />
      </Loyout>
    </Timezone>
  </div>
);

export default MyApp;
