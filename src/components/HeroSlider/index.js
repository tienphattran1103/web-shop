import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './HeroSlider.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function HeroSlider({ data, control, auto, timeOut = 3000 }) {
    const [activeSlide, setActiveSlide] = useState(0);
    const nextSlide = useCallback(() => {
        const index = activeSlide + 1 === data.length ? 0 : activeSlide + 1;
        setActiveSlide(index);
    }, [activeSlide, data]);

    const prevSlide = useCallback(() => {
        const index = activeSlide - 1 < 0 ? data.length - 1 : activeSlide - 1;
        setActiveSlide(index);
    }, [activeSlide, data]);

    useEffect(() => {
        if (auto) {
            const timeId = setInterval(nextSlide, timeOut);
            return () => clearInterval(timeId);
        }
    }, [nextSlide, auto, timeOut]);

    return (
        <div className={cx('hero-slider')}>
            {data.map((item, index) => (
                <HeroSliderItem key={index} data={item} isActive={index === activeSlide} />
            ))}
            {control && (
                <div className={cx('hero-slider__control')}>
                    <div className={cx('hero-slider__control__item')} onClick={prevSlide}>
                        <i className="bx bx-chevron-left"></i>
                    </div>
                    <div className={cx('hero-slider__control__item')}>
                        <div className={cx('index')}>
                            {activeSlide + 1} / {data.length}
                        </div>
                    </div>
                    <div className={cx('hero-slider__control__item')} onClick={nextSlide}>
                        <i className="bx bx-chevron-right"></i>
                    </div>
                </div>
            )}
        </div>
    );
}

const HeroSliderItem = ({ data, isActive }) => (
    <div
        className={cx('hero-slider__item', {
            active: isActive,
        })}
    >
        <div className={cx('hero-slider__item__info')}>
            <div
                className={cx('hero-slider__item__info__title', {
                    [`color-${data.color}`]: data.color,
                })}
            >
                <span>{data.title}</span>
            </div>
            <div className={cx('hero-slider__item__info__desc')}>
                <span>{data.description}</span>
            </div>
            <div className={cx('hero-slider__item__info__btn')}>
                <Link to={data.path}>
                    <Button backgroundColor={data.color} size={'sm'} icon="bx bx-cart" animate={true} onClick={null}>
                        Xem chi tiết
                    </Button>
                </Link>
            </div>
        </div>
        <div className={cx('hero-slider__item__img')}>
            <div
                className={cx('shape', {
                    [`bg-${data.color}`]: data.color,
                })}
            ></div>
            <img src={data.img} alt="slider" />
        </div>
    </div>
);

HeroSlider.propTypes = {
    data: PropTypes.array.isRequired,
    control: PropTypes.bool,
    auto: PropTypes.bool,
    timeOut: PropTypes.number,
};

export default HeroSlider;
