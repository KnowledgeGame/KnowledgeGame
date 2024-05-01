import classNames from 'classnames/bind';
import style from './VerticalSidebar.module.scss';
import { useParams } from 'react-router-dom';
import Header from '~/components/Layout/components/Header';
import Footer from '~/components/Layout/DefaultLayout/components/Footer';
import Sidebar from '../../components/Sidebar';

const cx = classNames.bind(style);

function VerticalSidebar({ children }) {
    const { course } = useParams();
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container w-100')}>
                <h3 className={cx('pt-4')}>{course}</h3>
            </div>
            <div className={cx('container w-100 pt-3')}>
                <div className={cx('row')}>
                    <div className={cx('col-3')}>
                        <Sidebar />
                    </div>
                    <dir className={cx('col-9')}>
                        <div className={cx('content')}>{children}</div>
                    </dir>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default VerticalSidebar;
