import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './Grid.module.scss';

const cx = classNames.bind(styles);

function Grid({ col, mdCol, smCol, gap, children }) {
    const style = {
        gap: gap ? `${gap}px` : '0',
    };

    return (
        <div
            className={cx('grid', {
                [`grid-col-${col}`]: col,
                [`grid-col-md-${mdCol}`]: mdCol,
                [`grid-col-sm-${smCol}`]: smCol,
            })}
            style={style}
        >
            {children}
        </div>
    );
}

Grid.propTypes = {
    col: PropTypes.number.isRequired,
    mdCol: PropTypes.number,
    smCol: PropTypes.number,
    gap: PropTypes.number,
    children: PropTypes.node,
};

export default Grid;
