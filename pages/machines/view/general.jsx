import React, { useContext, useEffect } from "react";
import styles from "../../../styles/Machine.module.css";
import MachinesByBrand from "../../../components/machine/view/MachinesByBrand";
import MachinesByStatus from "../../../components/machine/view/MachinesByStatus";
import { MachineContext } from "../../../context/Machines/MachineContext";

function Overview() {
  const {
    aggregatedRes,
    aggregationError,
    machineAggregating,
    machineAggregation,
  } = useContext(MachineContext);
  useEffect(() => {
    machineAggregation();
  }, []);
  console.log(aggregatedRes);
  return (
    <div className={styles.machine}>
      <div className={styles.top}>
        <div className={styles.header}>
          <div className={styles.title}>Machine Breakdown</div>
        </div>
      </div>
      {aggregatedRes !== null && (
        <div className={styles.gridcontainer}>
          <MachinesByBrand
            totalCount={aggregatedRes[0]}
            byModelCount={aggregatedRes[1]}
            colorCount={aggregatedRes[3]}
            blackCount={aggregatedRes[2]}
            machinesInField={aggregatedRes[4]}
          />
          <MachinesByStatus
            clientUp={aggregatedRes[4]}
            clientDown={aggregatedRes[5]}
            warehouseUp={aggregatedRes[6]}
            warehouseDown={aggregatedRes[7]}
            clientDownByModel={aggregatedRes[8]}
          />
        </div>
      )}
    </div>
  );
}

export default Overview;
