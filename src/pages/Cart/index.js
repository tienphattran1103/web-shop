import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Helmet from '~/components/Helmet';
import Button from '~/components/Button';
import styles from './Cart.module.scss';
import productData from '~/assets/fake-data/products';
import numberWithCommas from '~/utils/numberWithCommas';
import CartItem from '~/components/CartItem';

const cx = classNames.bind(styles);

function Cart() {
    const Items = useSelector((state) => state.cartsItem.value);
    const cartItems = productData.getCartItemsInfo(Items);

    console.log('>>> Items: ', Items);
    console.log('>>> cartItems: ', cartItems);

    const [totalProduct, setTotalProduct] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        setTotalProduct(
            cartItems.reduce((total, item) => {
                return total + Number(item.quantity);
            }, 0),
        );
        setTotalPrice(
            cartItems.reduce((total, item) => {
                return total + Number(item.quantity) * Number(item.product.price);
            }, 0),
        );
    }, [cartItems]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Helmet title="Giỏ hàng">
            <div className={cx('cart')}>
                <div className={cx('cart__info')}>
                    <div className={cx('cart__info__txt')}>
                        <p>Bạn có {totalProduct} sản phẩm trong giỏ hàng</p>
                        <div className={cx('cart__info__txt__price')}>
                            <span>Thành tiền: </span>
                            <span> {numberWithCommas(totalPrice)} </span>
                        </div>
                    </div>
                    <div className={cx('cart__info__btn')}>
                        <Button size={'block'}>Đặt hàng</Button>
                        <Link to={'/catalog'}>
                            <Button size={'block'}>Tiếp tục mua hàng</Button>
                        </Link>
                    </div>
                </div>
                <div className={cx('cart__list')}>
                    {cartItems.map((item, index) => (
                        <CartItem key={index} item={item} />
                    ))}
                </div>
            </div>
        </Helmet>
    );
}

export default Cart;
