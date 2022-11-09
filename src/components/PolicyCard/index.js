import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import style from './PolicyCard.module.scss';

const cx = classNames.bind(style);

function PolicyCard({ name, desc, icon }) {
    return (
        <div className={cx('policy-card')}>
            <div className={cx('policy-card__icon')}>
                <i className={icon}></i>
            </div>
            <div className={cx('policy-card__info')}>
                <div className={cx('policy-card__info__name')}>{name}</div>
                <div className={cx('policy-card__info__desc')}>{desc}</div>
            </div>
        </div>
    );
}

PolicyCard.propTypes = {
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
};

export default PolicyCard;
