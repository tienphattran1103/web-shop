import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './InfinityList.module.scss';
import Grid from '~/components/Grid';
import ProductCard from '~/components/ProductCard';

const cx = classNames.bind(styles);

function InfinityList({ data }) {
    const perLoad = 6; //item each load
    const listRef = useRef(null);
    const [productsData, setProductsData] = useState([]);
    const [isLoad, setIsLoad] = useState(true);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        setProductsData(data);
        if (data.length > perLoad) {
            setProductsData(data.slice(0, perLoad));
        }
    }, [data]);

    //detect if user scroll to bottom of listRef
    useEffect(() => {
        const bottomReach = () => {
            if (window.scrollY + window.innerHeight >= listRef.current.clientHeight + listRef.current.offsetTop) {
                // console.log('Bottom reached');
                setIsLoad(true);
            }
        };
        window.addEventListener('scroll', bottomReach);
        return () => {
            window.removeEventListener('scroll', bottomReach);
        };
    }, [listRef]);

    //Load more items
    useEffect(() => {
        const getItem = () => {
            const pages = Math.floor(data.length / perLoad);
            const maxIndex = data.length % perLoad === 0 ? pages : pages + 1;

            if (isLoad && index < maxIndex) {
                const start = perLoad * index;
                const end = start + perLoad;

                setProductsData(productsData.concat(data.slice(start, end)));
                setIndex(index + 1);
            }
        };

        getItem();
        setIsLoad(false);
    }, [data, index, isLoad, productsData]);

    return (
        <div ref={listRef} className={cx('styles')}>
            <Grid col={3} mdCol={2} smCol={1} gap={20}>
                {productsData.map((item, index) => (
                    <ProductCard
                        key={index}
                        img01={item.image01}
                        img02={item.image02}
                        title={item.title}
                        price={Number(item.price)}
                        slug={item.slug}
                    />
                ))}
            </Grid>
        </div>
    );
}

InfinityList.propTypes = {
    data: PropTypes.array.isRequired,
};

export default InfinityList;
