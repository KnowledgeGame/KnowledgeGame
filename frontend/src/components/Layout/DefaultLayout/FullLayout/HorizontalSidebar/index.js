import classNames from 'classnames/bind';
import style from './HorizontalSidebar.module.scss';

import Header from '~/components/Layout/components/Header';
import Footer from '~/components/Layout/DefaultLayout/components/Footer';
import SidebarHorizontal from '../../components/SidebarHorizontal';

const cx = classNames.bind(style);

function HorizontalSidebar({ children }) {
    

    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container-content-wrap')}>
                <div className={cx('container')}>
                    <SidebarHorizontal></SidebarHorizontal>
                </div>
                
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default HorizontalSidebar;
