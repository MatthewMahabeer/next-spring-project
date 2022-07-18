import React from 'react';
import { getBrands, getModels } from '../api/apiHandler';
import Brand from '../../components/machine/createx/Brands';
import styles from "../../styles/Machine.module.css";
import Link from "next/link";


function CreateX() {

    return (
        <React.Fragment>
                <div className={styles.machine}>

          <div className={styles.top}>
        <div className={styles.header}>
          <div className={styles.title}>Add Machine</div>
        </div>
        <Link href="/machines/view/general" passHref>
          <button className={styles.viewmachines}>View Machines</button>
        </Link>
      </div>
          <Brand />
          </div>
        </React.Fragment>
    )
}
export default CreateX;