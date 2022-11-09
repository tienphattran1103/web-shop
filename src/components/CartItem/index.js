import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';

import styles from './CartItem.module.scss';
import { Link } from 'react-router-dom';
import { updateItem, removeItem } from '~/redux/cart-items/cartItemsSlice';
import numberWithCommas from '~/utils/numberWithCommas';

const cx = classNames.bind(styles);

function CartItem({ item }) {
    const [quantity, setQuantity] = useState();

    const dispatch = useDispatch();

    useEffect(() => {
        setQuantity(item.quantity);
    }, [item.quantity]);

    const handleQuantityChange = (type) => {
        let newQuantity = quantity;
        console.log('newQuantity: ', newQuantity);
        if (type === 'PLUS') {
            newQuantity += 1;
        }
        if (type === 'MINUS') {
            quantity === 1 ? (newQuantity = 1) : (newQuantity -= 1);
        }

        dispatch(updateItem({ ...item, quantity: newQuantity }));
    };

    const handleRemoveItem = (item) => {
        dispatch(removeItem(item));
    };

    const colorText = (color) => {
        switch (color) {
            case 'red':
                return 'Đỏ';
            case 'white':
                return 'Trắng';
            case 'blue':
                return 'Xanh';
            case 'orange':
                return 'Cam';
            case 'pink':
                return 'Hồng';
            case 'black':
                return 'Đen';
            case 'yellow':
                return 'Vàng';
            default:
                return;
        }
    };

    return (
        <div className={cx('cart__item')}>
            <div className={cx('cart__item__img')}>
                <img src={item.product.image01} alt="" />
            </div>
            <div className={cx('cart__item__info')}>
                <div className={cx('cart__item__info__name')}>
                    <div className={cx('cart__item__info__name__title')}>
                        <Link to={`/catalog/${item.slug}`}>{item.product.title}</Link>
                    </div>
                    <div className={cx('cart__item__info__name__details')}>
                        <p>Màu: {colorText(item.color)}</p>
                        <p>Size: {item.size}</p>
                    </div>
                </div>

                <div className={cx('cart__item__info__total')}>
                    <div className={cx('cart__item__info__total__price')}>{numberWithCommas(item.product.price)}đ</div>
                    <div className={cx('cart__item__info__total__quantity')}>
                        <div className={cx('product__info__item__quantity')}>
                            <div
                                className={cx('product__info__item__quantity__btn')}
                                onClick={() => handleQuantityChange('MINUS')}
                            >
                                <i className="bx bx-minus"></i>
                            </div>
                            <div className={cx('product__info__item__quantity__show')}>{quantity}</div>
                            <div
                                className={cx('product__info__item__quantity__btn')}
                                onClick={() => handleQuantityChange('PLUS')}
                            >
                                <i className="bx bx-plus"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('cart__item__info__del')} onClick={() => handleRemoveItem(item)}>
                    <i className="bx bx-trash"></i>
                </div>
            </div>
        </div>
    );
}

CartItem.propTypes = {
    item: PropTypes.object,
};

export default CartItem;
