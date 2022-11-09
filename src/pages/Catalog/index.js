import React, { useCallback, useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';

import styles from './Catalog.module.scss';
import Helmet from '~/components/Helmet';
import Checkbox from '~/components/Checkbox';
import Button from '~/components/Button';
import InfinityList from '~/components/InfinityList';
import { useSelector } from 'react-redux';

import productData from '~/assets/fake-data/products';
import colorsData from '~/assets/fake-data/product-color';
import sizeData from '~/assets/fake-data/product-size';
import category from '~/assets/fake-data/category';
import ProductViewModal from '~/components/ProductViewModal';

const cx = classNames.bind(styles);

const initFilter = {
    category: [],
    color: [],
    size: [],
};

function Catalog() {
    const productsList = productData.getAllProducts();
    const [filter, setFilter] = useState(initFilter);
    const [products, setProduct] = useState(productsList);
    const productSlugModal = useSelector((state) => state.productModal.slug);

    // Lưu những filter đã chọn
    const filterSelect = (type, checked, item) => {
        if (checked) {
            switch (type) {
                case 'CATEGORY':
                    setFilter({ ...filter, category: [...filter.category, item.categorySlug] });
                    break;
                case 'COLOR':
                    setFilter({ ...filter, color: [...filter.color, item.color] });
                    break;
                case 'SIZE':
                    setFilter({ ...filter, size: [...filter.size, item.size] });
                    break;
                default:
            }
        } else {
            switch (type) {
                case 'CATEGORY':
                    const newCategory = filter.category.filter((e) => e !== item.categorySlug);
                    setFilter({ ...filter, category: newCategory });
                    break;
                case 'COLOR':
                    const newColor = filter.color.filter((e) => e !== item.color);
                    setFilter({ ...filter, color: newColor });
                    break;
                case 'SIZE':
                    const newSize = filter.size.filter((e) => e !== item.size);
                    setFilter({ ...filter, size: newSize });
                    break;
                default:
            }
        }
    };

    // Xóa bộ lọc
    const clearFilter = () => {
        setFilter(initFilter);
    };

    // Update sản phẩm, hiển thị theo bộ lọc
    const updateProducts = useCallback(() => {
        let filteredProducts = productsList;

        if (filter.category.length > 0) {
            filteredProducts = filteredProducts.filter((filteredProduct) =>
                filter.category.includes(filteredProduct.categorySlug),
            );
        }
        if (filter.color.length > 0) {
            filteredProducts = filteredProducts.filter((filteredProduct) => {
                const check = filteredProduct.colors.find((color) => filter.color.includes(color));
                return check;
            });
        }
        if (filter.size.length > 0) {
            filteredProducts = filteredProducts.filter((filteredProduct) => {
                const check = filteredProduct.size.find((sizeEle) => filter.size.includes(sizeEle));
                return check;
            });
        }

        // console.log('số lượng sản phẩm: ', filteredProducts);
        setProduct(filteredProducts);
    }, [filter, productsList]);

    useEffect(() => {
        updateProducts();
    }, [updateProducts]);

    const filterRef = useRef(null);

    const handleFilterToggle = () => filterRef.current.classList.toggle(cx('active'));
    return (
        <Helmet title="Sản phẩm">
            <div className={cx('catalog')}>
                <div className={cx('catalog__filter__toggle')}>
                    <Button size={'sm'} onClick={handleFilterToggle}>
                        Bộ lọc
                    </Button>
                </div>
                <div className={cx('catalog__filter')} ref={filterRef}>
                    <div className={cx('catalog__filter__close')} onClick={handleFilterToggle}>
                        <i className="bx bx-chevron-left"></i>
                    </div>
                    {/* Product list filter*/}
                    <div className={cx('catalog__filter__widget')}>
                        <div className={cx('catalog__filter__widget__title')}>danh mục sản phẩm</div>
                        <div className={cx('catalog__filter__widget__content')}>
                            {category.map((item, index) => (
                                <div key={index} className={cx('catalog__filter__widget__content__item')}>
                                    <Checkbox
                                        label={item.display}
                                        onChange={(input) => filterSelect('CATEGORY', input.checked, item)}
                                        checked={filter.category.includes(item.categorySlug)}
                                    ></Checkbox>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product color filter */}
                    <div className={cx('catalog__filter__widget')}>
                        <div className={cx('catalog__filter__widget__title')}>Kích cỡ</div>
                        <div className={cx('catalog__filter__widget__content')}>
                            {colorsData.map((item, index) => (
                                <div key={index} className={cx('catalog__filter__widget__content__item')}>
                                    <Checkbox
                                        label={item.display}
                                        onChange={(input) => filterSelect('COLOR', input.checked, item)}
                                        checked={filter.color.includes(item.color)}
                                    ></Checkbox>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product size filter */}
                    <div className={cx('catalog__filter__widget')}>
                        <div className={cx('catalog__filter__widget__title')}>màu sắc</div>
                        <div className={cx('catalog__filter__widget__content')}>
                            {sizeData.map((item, index) => (
                                <div key={index} className={cx('catalog__filter__widget__content__item')}>
                                    <Checkbox
                                        label={item.display}
                                        onChange={(input) => filterSelect('SIZE', input.checked, item)}
                                        checked={filter.size.includes(item.size)}
                                    ></Checkbox>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Clear filter button */}
                    <div className={cx('catalog__filter__widget')}>
                        <Button size={'sm'} onClick={clearFilter}>
                            Xóa bộ lọc
                        </Button>
                    </div>
                </div>
                <div className={cx('catalog__content')}>
                    <InfinityList data={products} />
                </div>
            </div>

            {/* add component ProductViewModal if have slug in product-modal redux */}
            {productSlugModal && <ProductViewModal />}
        </Helmet>
    );
}

export default Catalog;
