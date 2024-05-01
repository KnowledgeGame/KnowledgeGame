import classNames from 'classnames/bind';
import style from './HeaderAndFooter.module.scss';
import Header from '~/components/Layout/components/Header';
import Footer from '../components/Footer';
const cx = classNames.bind(style);

function HeaderAndFooter({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container-wrap-content-haf')}>{children}</div>
            <Footer />
        </div>
    );
}

export default HeaderAndFooter;
