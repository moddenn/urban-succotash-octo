
import React from "react";
import styles from './preloader.module.css';

const Preloader = ()=>{
    return(<div className={styles.SpinningPreloader_comp}>
        
        <div className={styles.Loading}>
            <div className={styles.circle}></div>
        </div>

    </div>)
};

export default Preloader;