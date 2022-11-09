import Header from '~/components/Header';
import className from 'classnames/bind';
import style from './HeaderLayout.module.scss';

const cx = className.bind(style);

function HeaderLayout({ children }) {
    return (
        <div>
            <Header />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default HeaderLayout;
