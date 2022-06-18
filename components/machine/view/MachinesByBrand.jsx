import React, { useState, useEffect } from "react";
import styles from "../../../styles/Machine.module.css";

const MachinesByBrand = (props) => {
  return (
    <div>
      <div className={styles.item1}>
        <span className={styles.toprowgridtitle}>
          <div className={styles.toptitle}>Total Machines</div>
        </span>
        <div className={styles.statsrow}>
          <div>
            <div className={styles.totalcount}>Total Count</div>
            <div className={styles.figure}>{props.totalCount}</div>
          </div>
          <div>
            <div className={styles.titleposition}>Breakdown by model</div>
            <div className={styles.svgposition}>
              <ul className={styles.ultotal}>
                {props.byModelCount.map((model, index) => (
                  <li className={styles.litotal} key={index}>
                    <span>{model.modelName}</span>
                    <span className={styles.span2}>{model._count}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <div className={styles.colorcontainer}>
              <div className={styles.itemtypevalue}>
                <div className={styles.bwlabel}>Black & White</div>
                <div className={styles.bwvalue}>{props?.blackCount}</div>
              </div>
              <div className={styles.itemtypevalue2}>
                <div className={styles.bwlabel}> Color</div>
                <div className={styles.bwvalue}>{props?.colorCount}</div>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.titleposition2}>Machines in the field</div>
            <div className={styles.colorcontainer2}>
              <div className={styles.centerdiv}>
                <div className={styles.verticalcenter}>
                  {props?.machinesInField}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.titleposition2}>Machines in the field</div>

            <div className={styles.colorcontainer2}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MachinesByBrand;
