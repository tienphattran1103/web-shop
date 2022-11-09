import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';

import { remove } from '~/redux/product-modal/productModalSlice';
import styles from './ProductViewModal.module.scss';
import ProductView from '~/components/ProductView';
import productData from '~/assets/fake-data/products';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function ProductViewModal() {
    const productSlug = useSelector((state) => state.productModal.slug);
    const [product, setProduct] = useState(undefined);
    const dispatch = useDispatch();
    // const product = productData.getProductBySlug('ao-thun-dinosaur-01');

    useEffect(() => {
        const productItem = productData.getProductBySlug(productSlug);
        setProduct(productItem);
    }, [productSlug]);

    return (
        <div
            className={cx('product-view__modal', {
                active: product,
            })}
        >
            <div className={cx('product-view__modal__content')}>
                <ProductView product={product} />
                <div className={cx('product-view__modal__content__close')}>
                    <Button size={'sm'} onClick={() => dispatch(remove())}>
                        đóng
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ProductViewModal;
