import React from "react";
import styles from "../../styles/Client.module.css";
import { isEmpty } from "lodash";

const BranchListComponent = (props) => {
  return (
    <div>
      <div className={props.active ? styles.blistitem2 : styles.blistitem}>
        {props.branch.name}
      </div>
    </div>
  );
};

export default BranchListComponent;
