import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import style from './Button.module.scss';

const cx = classNames.bind(style);

function button({ backgroundColor = 'main', size, icon, animate, onClick = null, children }) {
    return (
        <button
            className={cx('btn', {
                [`bg-${backgroundColor}`]: backgroundColor,
                [`btn-${size}`]: size,
                'btn-animate': animate,
            })}
            onClick={onClick}
        >
            <span className={cx('btn__txt')}>{children}</span>
            {icon && (
                <span className={cx('btn__icon')}>
                    <i className={cx({ [icon]: icon }, 'bx-tada')}></i>
                </span>
            )}
        </button>
    );
}

button.propTypes = {
    backgroundColor: PropTypes.string,
    size: PropTypes.string,
    icon: PropTypes.string,
    animate: PropTypes.bool,
    onClick: PropTypes.func,
};

export default button;
