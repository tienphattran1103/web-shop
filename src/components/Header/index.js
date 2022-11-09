import React, { useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import logo from '~/assets/images/Logo-2.png';
import className from 'classnames/bind';
import style from './Header.module.scss';

const cx = className.bind(style);

const mainNav = [
    {
        path: '/',
        display: 'Trang chủ',
    },
    {
        path: '/catalog',
        display: 'Sản phẩm',
    },
    {
        path: '/accessories',
        display: 'Phụ kiện',
    },
    {
        path: '/contact',
        display: 'Liên hệ',
    },
];

function Header() {
    const { pathname } = useLocation();
    const activeNav = mainNav.findIndex((e) => e.path === pathname);
    const headerRef = useRef(false);

    useEffect(() => {
        const addShrink = () => {
            if (document.body.scollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef.current.classList.add(cx('shrink'));
            } else {
                headerRef.current.classList.remove(cx('shrink'));
            }
        };

        window.addEventListener('scroll', addShrink);

        return () => {
            window.removeEventListener('scroll', addShrink);
        };
    }, []);

    const menuLeft = useRef();
    const menuToggle = () => menuLeft.current.classList.toggle(cx('active'));

    return (
        <header className={cx('header')} ref={headerRef}>
            <div className={cx('container')}>
                <div className={cx('header__logo')}>
                    <Link to="/">
                        <img src={logo} alt="" />
                    </Link>
                </div>
                <div className={cx('header__menu')}>
                    <div className={cx('mobile-toggle')} onClick={menuToggle}>
                        <i className="bx bx-menu-alt-left"></i>
                    </div>
                    <div className={cx('menu-left')} ref={menuLeft}>
                        <div className={cx('menu-left__close')} onClick={menuToggle}>
                            <i className="bx bx-chevron-left"></i>
                        </div>
                        {mainNav.map((nav, index) => (
                            <div
                                key={index}
                                className={cx('menu-left__item', 'header__menu__item', {
                                    active: activeNav === index,
                                })}
                                onClick={menuToggle}
                            >
                                <Link to={nav.path}>{nav.display}</Link>
                            </div>
                        ))}
                    </div>
                    <div className={cx('menu-right')}>
                        <div className={cx('menu-right__item', 'header__menu__item')}>
                            <i className="bx bx-search"></i>
                        </div>
                        <div className={cx('menu-right__item', 'header__menu__item')}>
                            <Link to="/cart">
                                <i className="bx bx-shopping-bag"></i>
                            </Link>
                        </div>
                        <div className={cx('menu-right__item', 'header__menu__item')}>
                            <i className="bx bx-user"></i>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
