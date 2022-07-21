import React, { useState } from 'react';
import styles from "../../styles/Machine.module.css";
import Link from "next/link";
import { useQuery, QueryErrorResetBoundary } from '@tanstack/react-query';
import { getBrands, getModels } from '../api/apiHandler';
import BrandModelListing, {selectedBrandAtom} from './components/BrandModelListing';
import { useAtom } from 'jotai';
import CircularProgress from '@mui/material/CircularProgress'
import { useSpring, animated, config } from 'react-spring';
import { isEmpty } from 'lodash';


function CreateX() {
  const [brandAtom] = useAtom(selectedBrandAtom);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);

  const { isLoading: brandsLoading, data: brands, error: brandsError } = useQuery(['brands'], getBrands);
  const { isLoading: modelsLoading, data: models, error: modelsError, refetch: refetchModels } = useQuery(['models'], () => getModels(selectedBrand?.id), {
    enabled: selectedBrand !== null,
  });

  const animation = useSpring({
    config: { ...config.stiff },
    from: { opacity: 0 },
    to: { opacity: 1 }
});

 function getModel(brand){
  if(selectedBrand == null) {
    setSelectedBrand(brand);
    return;
  } else {
    setSelectedBrand(brand);
    refetchModels()
  }
 }

  console.log(brands);
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
        <div className={styles.brandline}>
          <div className={styles.titleline}>
            <div className={styles.brandtitle}>Brands</div>
            <button className={styles.addbrandbutton}>Add a brand</button>
          </div>
          <hr className={styles.linebreak} />
          <div>
            {brandsLoading && 
            <div style={{margin: '0 40%'}}>
              <CircularProgress />
            </div> }
            {brandsError && <div style={{margin: 'auto'}}>
              There was an error retreiving brands from the database
            </div>}
            {!brandsLoading && !brandsError && 
            (!isEmpty(brands) && selectedBrand == null ? 
            <animated.div style={animation}>
              <div className={styles.brandlistcontainer}>
              {brands.map((brand) => {
                return (
                  <button key={brand.id} className={styles.brandlistitem} onClick={() => getModel(brand)}>
                    <div className={styles.brand}>
                      {brand.name}
                    </div>
                  </button>
                  
                )
              })}
              </div>
            </animated.div> : isEmpty(brands) ? 
            <div style={{margin: 'auto'}}>
              No brands found in the database.
            </div> : 
            !isEmpty(brands) && selectedBrand !== null ? 
            <animated.div>
                    <div className={styles.brandlistcontainer}>
                        <button className={styles.brandlistitem}>
                            <div className={styles.brand}>
                                {selectedBrand?.name}
                            </div>
                        </button>
                        <button
                            onClick={() => setSelectedBrand(null)}
                            className={styles.clearbrandstate}
                        >
                            Cancel
                        </button>
                    </div>
                </animated.div> : ''
            )
             }
          </div>
        </div>
        {selectedBrand !== null && (
          modelsLoading ? <div style={{margin: '0 40%'}}>
          <CircularProgress />
        </div> : 
        isEmpty(models) && !modelsError ? 
        <div className={styles.brandtitle}>
                                    No associated models were found for this brand.
                                </div> : 
        !isEmpty(models) ? 
        <animated.div>
        <div className={styles.brandlistcontainer}>
                                {models?.map((model) => {
                                    return (
                                        <button key={model.id} className={styles.brandlistitem}>
                                            <div className={styles.brand}>
                                                {model.name}
                                            </div>
                                        </button>
                                    )
                                })}
                            </div>
                            </animated.div>
                             : ''
        )
        }
      </div>
    </React.Fragment>
  );
}
export default CreateX;