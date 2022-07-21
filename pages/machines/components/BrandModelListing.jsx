import React from 'react';
import { isEmpty } from 'lodash';
import styles from "../../../styles/Machine.module.css";
import { atom, useAtom } from "jotai";
import { useSpring, animated, config } from 'react-spring';
import CircularProgress from '@mui/material/CircularProgress'


export const selectedBrandAtom = atom(null);
export const selectedModelAtom = atom(null);

const BrandModelListing = ({ brands, models, modelsLoading }) => {
    const [modelAtom, useModelAtom] = useAtom(selectedModelAtom);
    const [brandAtom, useBrandAtom] = useAtom(selectedBrandAtom);

    const animation = useSpring({
        config: { ...config.stiff },
        from: { opacity: 0 },
        to: { opacity: 1 }
    });

    return (
        <div>
            {!isEmpty(brands) && brandAtom == null ? (
                <animated.div style={animation}>
                    <div className={styles.brandlistcontainer}>
                        {brands.map((brand) => {
                            return (
                                <button className={styles.brandlistitem} key={brand.id} onClick={() => useBrandAtom(brand)}>
                                    <div className={styles.brand}>
                                        {brand.name}
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </animated.div>
            ) : selectedBrandAtom !== null ?
                <animated.div>
                    <div className={styles.brandlistcontainer}>
                        <button className={styles.brandlistitem}>
                            <div className={styles.brand}>
                                {brandAtom?.name}
                            </div>
                        </button>
                        <button
                            onClick={() => useBrandAtom(null)}
                            className={styles.clearbrandstate}
                        >
                            Cancel
                        </button>
                    </div>
                </animated.div>
                : ''
            }
            {brandAtom !== null ?
                <animated.div>
                    <div className={styles.brandline}>
                        <div className={styles.titleline}>
                            <div className={styles.brandtitle}>
                                Models
                            </div>
                            <button className={styles.addbrandbutton} onClick=''>
                                Add a model for {brandAtom?.name}
                            </button>
                        </div>
                        <hr className={styles.linebreak} />
                        {!modelsLoading && !isEmpty(models) && brandAtom !== null ?
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
                            : !modelsLoading && isEmpty(models) && brandAtom !== null ?
                                <div className={styles.brandtitle}>
                                    No associated models were found for this brand.
                                </div> : ''
                        }
                    </div>
                </animated.div>
                : ''
            }
        </div>
    );

}

export default BrandModelListing;