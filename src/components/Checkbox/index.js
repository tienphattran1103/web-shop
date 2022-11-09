import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './Checkbox.module.scss';

const cx = classNames.bind(styles);

function Checkbox({ label, checked, ...props }) {
    const inputRef = useRef(null);
    const onChange = () => {
        if (props.onChange) {
            props.onChange(inputRef.current);
        }
    };

    return (
        <label className={cx('custom-checkbox')}>
            <input type="checkbox" ref={inputRef} onChange={onChange} checked={checked} />
            <span className={cx('custom-checkbox__checkmark')}>
                <i className="bx bx-check"></i>
            </span>
            {label}
        </label>
    );
}

Checkbox.propTypes = {
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool,
};

export default Checkbox;
