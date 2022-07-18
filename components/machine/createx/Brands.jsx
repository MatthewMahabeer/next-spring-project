import React, { useRef } from 'react';
import { getBrands, getModels } from '../../../pages/api/apiHandler';
import { atom } from 'jotai';
import { useQuery } from 'react-query';
import styles from '../../../styles/Machine.module.css';
import AddBrand from './Modal/AddBrand';
import { CircularProgress } from '@mui/material';

export const BrandList = ({data}) => {
    return (
        <div className={styles.brandlistcontainer}>
            {data.map((brand => {
                return (
                    <button key={brand.id} className={styles.brandlistitem}>
                        <div className={styles.brand}>
                            {brand.name}
                        </div>
                    </button>
                )
            }))}
        </div>
    )
}

function Brand() {
   const { data: brands, isLoading, isError } = useQuery(['brands'], getBrands, {
        enabled: true,
    });
    const brandModalRef = useRef();

    const handleOpenBrandModal = () => {
        brandModalRef.current.openModal();
    }
  
    return (
        <div className={styles.brandline}>
           <div className={styles.titleline}>
          <div className={styles.brandtitle}>Brands</div>
          <AddBrand ref={brandModalRef} />
          <button onClick={handleOpenBrandModal} className={styles.addbrandbutton}>
            Add a brand
          </button>
          </div>
          <hr className={styles.linebreak} />
          {isLoading ? <div style={{marginLeft: "50%", marginTop: "10%"}}>{<CircularProgress />}</div> : isError ? <div style={{marginLeft: "35%", marginTop: "10%"}}>Error</div> : <BrandList data={brands.data} />}
        </div>
    );
}

export default Brand;
