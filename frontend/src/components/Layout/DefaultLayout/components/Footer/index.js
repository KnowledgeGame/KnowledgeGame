import classNames from 'classnames/bind';
import style from './Footer.module.scss';
import image from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import Mapbox from '~/assets/map/mapbox';
const cx = classNames.bind(style);

function Footer() {
    return (
        <footer>
            <div className={cx('wrapper')}>
                <div className={cx('footer-content-1')}>
                    <div>
                        <a href="abc">
                            <img className={cx('img-logo')} src={image.logoFull} alt="logo"></img>
                        </a>
                    </div>
                    <div className={cx('wrap-content-phone')}>
                        <FontAwesomeIcon icon={faPhone} /> Tel: 0836759850
                    </div>
                    <div className={cx('wrap-content-email')}>
                        <FontAwesomeIcon icon={faEnvelope} /> Email: shopkienthuc.dok@gmail.com
                    </div>
                </div>
                <div className={cx('footer-content-2')}>
                    <ul>
                        <li>
                            <a href="abc">
                                <FontAwesomeIcon icon={faCaretRight} /> Giới thiệu{' '}
                            </a>
                        </li>
                        <li>
                            <a href="abc">
                                <FontAwesomeIcon icon={faCaretRight} /> Hình thức thanh toán
                            </a>
                        </li>
                        <li>
                            <a href="abc">
                                <FontAwesomeIcon icon={faCaretRight} /> CS đổi và trả
                            </a>
                        </li>
                        <li>
                            <a href="abc">
                                <FontAwesomeIcon icon={faCaretRight} /> CS cam kết đầu ra
                            </a>
                        </li>
                    </ul>
                </div>
                <div className={cx('footer-content-3')}>
                    <p>
                        <FontAwesomeIcon icon={faLocationDot} /> Yên Ngưu - Tam Hiệp - H.Thanh Trì - Hà Nội
                    </p>
                    <div className={cx('footer-wrapper-map')}>
                        <Mapbox />
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
