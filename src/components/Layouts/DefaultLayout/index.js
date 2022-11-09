import Header from '~/components/Header';
import Footer from '~/components/Footer';
import className from 'classnames/bind';
import style from './DefaultLayout.module.scss';

const cx = className.bind(style);

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div className={cx('container')}>
                <div className={cx('main')}>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
