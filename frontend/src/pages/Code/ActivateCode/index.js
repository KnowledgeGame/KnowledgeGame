import classNames from 'classnames/bind';
import { FaCircleXmark } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import style from './Code.module.scss';
import images from '~/assets/images';
import axios from 'axios';
import { AuthContext } from '~/context/authcontext';
import { useContext } from 'react';

const cx = classNames.bind(style);

function Code() {
    const { user } = useContext(AuthContext);
    const [stateOptionCode, setStateOptionCode] = useState(false);
    const [code, setCode] = useState('');
    const [statisticStudents, setStatisticStudents] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [idTransactionHistory, setIdTransactionHistory] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/Momo/')
            .then((res) => {
                setCode(res.data);
            })
            .catch(() => {});
    }, []);

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/statisticStudents/')
            .then((res) => {
                setStatisticStudents(res.data);
            })
            .catch(() => {});
    }, []);

    const sendIdTransactionHistory = async () => {
        try {
            const data = { username: user.accountName, idTransactionHistory: idTransactionHistory };
            await axios.put('http://127.0.0.1:8000/api/studentsAccount/', data);
        } catch (error) {
            console.error('Error sending data to Django:', error);
        }
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleActive = (idCode) => {
        let state = 0;
        statisticStudents.forEach((statisticStudent) => {
            if (statisticStudent.idTransactionHistory === parseInt(idCode)) {
                setIdTransactionHistory(idCode);
                sendIdTransactionHistory();
                state = 1;
            }
        });
        if (state) {
            setMessage('Kích hoạt tài khoản thành công!');
        } else {
            setMessage('Mã kích hoạt chưa chính xác!');
        }
    };
    return (
        <div>
            <div className={cx('container')}>
                <div className={cx('row')}>
                    <div className={cx('wrap-banner', 'col-4')}>
                        <div
                            className={cx(
                                'banner',
                                'd-flex justify-content-center align-items-center flex-column w-100 h-100',
                            )}
                        >
                            <img className={cx('pb-3')} src={images.logo_removebg} alt="Logo" />
                            <p>Nhập mã kích hoạt</p>
                        </div>
                    </div>
                    <div className={cx('wrap-content', 'col-8 d-flex flex-column')}>
                        <input
                            type="text"
                            name="content-code"
                            value={inputValue}
                            id="content-code"
                            onChange={handleInputChange}
                            placeholder="Nhập mã kích hoạt của bạn tại đây!"
                        />
                        <span className="text-center text-danger">{message}</span>
                        <span>
                            Mã kích hoạt là gì? <a href="/">Xem tại đây</a>
                        </span>
                        <button className={cx('btn-enter')} onClick={() => handleActive(inputValue)}>
                            Kích hoạt mã
                        </button>
                        <button className={cx('btn-register')} onClick={() => setStateOptionCode(true)}>
                            Mua mã mới
                        </button>
                    </div>
                </div>
            </div>

            {stateOptionCode && (
                <>
                    <button className={cx('close-option-code')} onClick={() => setStateOptionCode(false)}>
                        <FaCircleXmark />
                    </button>
                    <div className={cx('wrap-option-code', 'd-flex justify-content-center align-items-center')}>
                        <div
                            className={cx(
                                'option-code-1',
                                ' d-flex flex-column justify-content-center align-items-center position-relative',
                            )}
                        >
                            <img className={cx('background-title')} src={images.buyCodeBlue} alt="buyCodeBlue" />
                            <span className={cx('title')}>1 Tháng</span>
                            <span className={cx('state')}>Giảm giá</span>
                            <span>Ngày kết thúc: 31/05/2023</span>
                            <span className={cx('initial-price')}>6,000,000 đ</span>
                            <span className={cx('price-after-discount')}>2,000,000 đ</span>
                            <Link to={code.payUrl}>Buy now</Link>
                        </div>
                        <div
                            className={cx(
                                'option-code-2',
                                'd-flex flex-column justify-content-center align-items-center position-relative',
                            )}
                        >
                            <img className={cx('background-title')} src={images.buyCodeGray} alt="buyCodeGray" />
                            <span className={cx('title')}>6 Tháng</span>
                            <span className={cx('state')}>Giảm giá</span>
                            <span>Ngày kết thúc: 31/05/2023</span>
                            <span className={cx('initial-price')}>6,000,000 đ</span>
                            <span className={cx('price-after-discount')}>2,000,000 đ</span>
                            <Link to="/code/Momo">Buy now</Link>
                        </div>
                        <div
                            className={cx(
                                'option-code-3',
                                ' d-flex flex-column justify-content-center align-items-center position-relative',
                            )}
                        >
                            <img className={cx('background-title')} src={images.buyCodePink} alt="buyCodePink" />
                            <span className={cx('title')}>12 Tháng</span>
                            <span className={cx('state')}>Giảm giá</span>
                            <span>Ngày kết thúc: 31/05/2023</span>
                            <span className={cx('initial-price')}>6,000,000 đ</span>
                            <span className={cx('price-after-discount')}>2,000,000 đ</span>
                            <Link to="/code/Momo">Buy now</Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Code;
