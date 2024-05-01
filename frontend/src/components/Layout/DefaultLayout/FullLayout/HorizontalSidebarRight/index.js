import classNames from 'classnames/bind';
import style from './HorizontalSidebarRight.module.scss';
// import { useParams } from 'react-router-dom';
import Header from '~/components/Layout/components/Header';
import Footer from '~/components/Layout/DefaultLayout/components/Footer';
import SidebarHorizontalRight from '../../components/SidebarHorizontalRight';

const cx = classNames.bind(style);

function HorizontalSidebarRight({ children }) {
    // const { subject } = useParams();

    return (
        <div className={cx('wrapper-sidebar-right')}>
            <Header />
            <div className={cx('container-content-wrap-r', ' p-5')}>
                {children}
                <div className={cx('container', 'container-wrap-sidebar')}>
                    <SidebarHorizontalRight></SidebarHorizontalRight>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default HorizontalSidebarRight;
