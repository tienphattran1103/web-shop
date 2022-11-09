import React from 'react';
import classNames from 'classnames/bind';

import styles from './Section.module.scss';

const cx = classNames.bind(styles);

function Section({ children }) {
    return <div className={cx('section')}>{children}</div>;
}

export function SectionTitle({ children }) {
    return <div className={cx('section__title')}>{children}</div>;
}

export function SectionBody({ children }) {
    return <div className={cx('section__body')}>{children}</div>;
}

export default Section;
