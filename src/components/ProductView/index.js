import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { addItem } from '~/redux/cart-items/cartItemsSlice';
import styles from './ProductView.module.scss';
import Button from '~/components/Button';
import numberWithCommas from '~/utils/numberWithCommas';

const cx = classNames.bind(styles);

function ProductView({ product }) {
    if (product === undefined) {
        product = {
            title: '',
            price: '',
            colors: [],
            size: [],
        };
    }

    const [isExpand, setIsExpand] = useState(false);
    const [mainImg, setMainImg] = useState();
    const [activeColor, setActiveColor] = useState(undefined);
    const [activeSize, setActiveSize] = useState(undefined);
    const [quantity, setQuantity] = useState(1);

    const dispatch = useDispatch();

    useEffect(() => {
        setMainImg(product.image01);
    }, [product.image01]);

    const navigate = useNavigate();

    const handleActiveColor = (color) => {
        if (color === activeColor) setActiveColor(null);
        else setActiveColor(color);
    };

    const handleActiveSize = (size) => {
        if (size === activeSize) setActiveSize(null);
        else setActiveSize(size);
    };

    const check = () => {
        if (activeColor === undefined) {
            alert('Vui lòng chọn màu sắc');
            return false;
        }
        if (activeSize === undefined) {
            alert('Vui lòng chọn kích thước');
            return false;
        }
        return true;
    };

    const addToCart = () => {
        if (check()) {
            const item = {
                slug: product.slug,
                color: activeColor,
                size: activeSize,
                quantity: quantity,
            };

            dispatch(addItem(item));
            alert('Thêm thành công');
        }
    };

    const goToCart = () => {
        if (check()) navigate('/cart');
    };

    return (
        <div className={cx('product')}>
            {/* Image and description product */}
            <div className={cx('product__imgs')}>
                <div className={cx('product__imgs__list')}>
                    <img
                        className={cx('product__imgs__list__item')}
                        src={product.image01}
                        onClick={() => setMainImg(product.image01)}
                        alt=""
                    ></img>
                    <img
                        className={cx('product__imgs__list__item')}
                        src={product.image02}
                        onClick={() => setMainImg(product.image02)}
                        alt=""
                    ></img>
                </div>
                <div className={cx('product__imgs__main')}>
                    <img src={mainImg} alt=""></img>
                </div>

                {/* Product description */}
                <div className={cx('product-desc')}>
                    <div
                        className={cx('product-desc__content', {
                            expand: isExpand,
                        })}
                    >
                        <div className={cx('product-desc__content__title')}>Mô tả sản phẩm</div>
                        <div
                            className={cx('product-desc__content__info')}
                            dangerouslySetInnerHTML={{ __html: product.description }}
                        >
                            {/* {product.description} */}
                        </div>
                    </div>
                    <div className={cx('product-desc__btn')}>
                        <Button size={'sm'} onClick={() => setIsExpand(!isExpand)}>
                            {isExpand ? 'Thu gọn' : 'Xem thêm'}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Product infomation */}
            <div className={cx('product__info')}>
                <div className={cx('product__info__name')}>{product.title}</div>
                <div className={cx('product__info__item')}>
                    <div className={cx('product__info__item__price')}>{numberWithCommas(product.price)}</div>
                </div>
                <div className={cx('product__info__item')}>
                    <div className={cx('product__info__item__title')}>Màu sắc</div>
                    <div className={cx('product__info__item__list')}>
                        {product.colors.map((color, index) => (
                            <div
                                key={index}
                                className={cx('product__info__item__list__item', {
                                    active: color === activeColor,
                                })}
                                onClick={() => handleActiveColor(color)}
                            >
                                <span className={cx('product__info__item__list__item__circle', `bg-${color}`)}></span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={cx('product__info__item')}>
                    <div className={cx('product__info__item__title')}>Kích thước</div>
                    <div className={cx('product__info__item__list')}>
                        {product.size.map((item, index) => (
                            <div
                                key={index}
                                className={cx('product__info__item__list__item', {
                                    active: item === activeSize,
                                })}
                                onClick={() => handleActiveSize(item)}
                            >
                                <span className={cx('product__info__item__list__item__size')}>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={cx('product__info__item')}>
                    <div className={cx('product__info__item__title')}>Số lượng</div>
                    <div className={cx('product__info__item__quantity')}>
                        <div
                            className={cx('product__info__item__quantity__btn')}
                            onClick={() => {
                                setQuantity(quantity === 1 ? 1 : quantity - 1);
                            }}
                        >
                            <i className="bx bx-minus"></i>
                        </div>
                        <div className={cx('product__info__item__quantity__show')}>{quantity}</div>
                        <div
                            className={cx('product__info__item__quantity__btn')}
                            onClick={() => {
                                setQuantity(quantity + 1);
                            }}
                        >
                            <i className="bx bx-plus"></i>
                        </div>
                    </div>
                </div>

                <div className={cx('product__info__item')}>
                    <Button size={'sm'} onClick={addToCart}>
                        Thêm vào giỏ
                    </Button>
                    <Button size={'sm'} onClick={goToCart}>
                        Mua ngay
                    </Button>
                </div>
            </div>

            {/* Product description on Mobile */}
            <div className={cx('product-desc', 'mobile')}>
                <div
                    className={cx('product-desc__content', {
                        expand: isExpand,
                    })}
                >
                    <div className={cx('product-desc__content__title')}>Mô tả sản phẩm</div>
                    <div
                        className={cx('product-desc__content__info')}
                        dangerouslySetInnerHTML={{ __html: product.description }}
                    >
                        {/* {product.description} */}
                    </div>
                </div>
                <div className={cx('product-desc__btn')}>
                    <Button size={'sm'} onClick={() => setIsExpand(!isExpand)}>
                        {isExpand ? 'Thu gọn' : 'Xem thêm'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

ProductView.propTypes = {
    product: PropTypes.object,
};

export default ProductView;
