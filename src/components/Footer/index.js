import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import style from './Footer.module.scss';
import Grid from '~/components/Grid';
import logo from '~/assets/images/Logo-2.png';

const footerAboutLinks = [
    {
        display: 'Giới thiệu',
        path: '/about',
    },
    {
        display: 'Liên hệ',
        path: '/about',
    },
    {
        display: 'Tuyển dụng',
        path: '/about',
    },
    {
        display: 'Tin tức',
        path: '/about',
    },
    {
        display: 'Hệ thống cửa hàng',
        path: '/about',
    },
];

const footerCustomerLinks = [
    {
        display: 'Chính sách đổi trả',
        path: '/about',
    },
    {
        display: 'Chính sách bảo hành',
        path: '/about',
    },
    {
        display: 'Chính sách hoàn tiền',
        path: '/about',
    },
];

const cx = classNames.bind(style);

function Footer() {
    return (
        <footer className={cx('footer')}>
            <div className={cx('container')}>
                <Grid col={4} mdCol={2} smCol={1} gap={10}>
                    <div className={cx('footer-item')}>
                        <div className={cx('footer-item__title')}>Tổng đài hỗ trợ</div>
                        <div className={cx('footer-item__content')}>
                            <p>
                                Liên hệ đặt hàng <strong>012456789</strong>
                            </p>
                            <p>
                                Thắc mắc đơn hàng <strong>012456789</strong>
                            </p>
                            <p>
                                Góp ý khiếu nại <strong>012456789</strong>
                            </p>
                        </div>
                    </div>
                    <div className={cx('footer-item')}>
                        <div className={cx('footer-item__title')}>Về Yolo</div>
                        <div className={cx('footer-item__content')}>
                            {footerAboutLinks.map((item, index) => (
                                <div key={index}>
                                    <Link to={item.path}>{item.display}</Link>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={cx('footer-item')}>
                        <div className={cx('footer-item__title')}>Chăm sóc khách hàng</div>
                        <div className={cx('footer-item__content')}>
                            {footerCustomerLinks.map((item, index) => (
                                <div key={index}>
                                    <Link to={item.path}>{item.display}</Link>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={cx('footer-item')}>
                        <p>
                            <img src={logo} alt="" className={cx('footer-item__logo')}></img>
                        </p>
                        <p>
                            Hướng đến mục tiêu mang lại niềm vui ăn mặc mới mỗi ngày cho hàng triệu người tiêu dùng
                            Việt. Hãy cùng Yolo hướng đến một cuộc sống năng động, tích cực hơn.
                        </p>
                    </div>
                </Grid>
            </div>
        </footer>
    );
}

export default Footer;
