import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';

import { set } from '~/redux/product-modal/productModalSlice';
import styles from './ProductCard.module.scss';
import Button from '~/components/Button';
import numberWithCommas from '~/utils/numberWithCommas';

const cx = classNames.bind(styles);

function ProductCard({ img01, img02, title, price, slug }) {
    const dispatch = useDispatch();

    return (
        <div className={cx('product-card')}>
            <Link to={`/catalog/${slug}`}>
                <div className={cx('product-card__img')}>
                    <img src={img01} alt=""></img>
                    <img src={img02} alt=""></img>
                </div>
                <div className={cx('product-card__title')}>{title}</div>
                <div className={cx('product-card__price')}>
                    {numberWithCommas(price)}
                    <del className={cx('product-card__price__old')}>{numberWithCommas(198000)}</del>
                </div>
            </Link>
            <Button size="sm" icon="bx bx-cart" animate={true} onClick={() => dispatch(set(slug))}>
                chọn mua
            </Button>
        </div>
    );
}

ProductCard.propTypes = {
    img01: PropTypes.string.isRequired,
    img02: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
};

export default ProductCard;
