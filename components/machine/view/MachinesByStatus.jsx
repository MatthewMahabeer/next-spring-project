import styles from "../../../styles/Machine.module.css";

const MachinesByStatus = (props) => {
  return (
    <div>
      <div className={styles.item2}>
        <span className={styles.toprowgridtitle}>
          <div className={styles.toptitle}>
            Machine Breakdown by Status and Model
          </div>
        </span>
        <div className={styles.item2container}>
          <div className={styles.statuscountcontainer}>
            <span className={styles.toprowgridtitle}>
              <div className={styles.toptitle}>Count by Status</div>
            </span>
            <div className={styles.statusinside}>
              <div className={styles.statusmodule1}>
                <span className={styles.toprowgridtitlesmall}>
                  <div className={styles.toptitlesmall}>Client/Up</div>
                </span>
                <div className={styles.statusfigure}>{props?.clientUp}</div>
              </div>
              <div className={styles.statusmodule2}>
                <span className={styles.toprowgridtitlesmall}>
                  <div className={styles.toptitlesmall}>Client/Down</div>
                </span>
                <div className={styles.statusfigure}>{props?.clientDown}</div>
              </div>
              <div className={styles.statusmodule3}>
                <span className={styles.toprowgridtitlesmall}>
                  <div className={styles.toptitlesmall}>Warehouse/Up</div>
                </span>
                <div className={styles.statusfigure}>{props?.warehouseUp}</div>
              </div>
              <div className={styles.statusmodule4}>
                <span className={styles.toprowgridtitlesmall}>
                  <div className={styles.toptitlesmall}>Warehouse/Down</div>
                </span>
                <div className={styles.statusfigure}>
                  {props?.warehouseDown}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.rangecountcontainer}>
            <span className={styles.toprowgridtitle}>
              <div className={styles.toptitle}>Client/Down by Model</div>
            </span>
            <ul className={styles.ultotal}>
              {props?.clientDownByModel.map((model, index) => (
                <li className={styles.litotal} key={index}>
                  <span>{model.modelName}</span>
                  <span className={styles.span2}>{model._count}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.spreadcountcontainer}>
            <span className={styles.toprowgridtitle}>
              <div className={styles.toptitle}></div>
            </span>
            <div className={styles.titleposition}>Breakdown by model</div>
          </div>
          <div className={styles.notcontainer}>
            <span className={styles.toprowgridtitle}>
              <div className={styles.toptitle}>Count by Status</div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MachinesByStatus;
