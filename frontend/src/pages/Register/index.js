import classNames from 'classnames/bind';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FaCircleXmark } from 'react-icons/fa6';
import style from './Register.module.scss';
const cx = classNames.bind(style);

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [stateRegister, setStateRegister] = useState(null);
    const [notification, setNotification] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/studentsAccount/post_dang_ky', {
                name: name,
                username: username,
                password: password,
                email: email,
                code: code,
            });
            setNotification(response.data.success);
            setStateRegister(true);
        } catch (error) {
            setNotification(error.response.data.error);
            setStateRegister(false);
        }
    };
    if (stateRegister) {
        // eslint-disable-next-line no-restricted-globals
        const value = confirm(notification);
        setStateRegister(null);
        if (value) {
            navigate('/login');
        }
    }
    return (
        <div className={cx('d-flex justify-content-center')}>
            <div className={cx('contain-login')}>
                <div className={cx('element-space')}>
                    <div className={cx('text-center', 'login-title')}>Đăng ký</div>
                    <div className={cx('text-center', 'login-outside')}>
                        <button className={cx('btn-login-facebook')}>Đăng ký bằng Facebook</button>
                        <button className={cx('btn-login-gmail')}>Đăng ký bằng Google</button>
                    </div>
                    <div className={cx('text-center', 'login-or')}>Hoặc</div>
                    <input
                        className={cx('login-input')}
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Họ và tên"
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        className={cx('login-input')}
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Tên tài khoản"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        className={cx('login-input')}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Mật khẩu"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        className={cx('login-input')}
                        type="email"
                        name="emailAddress"
                        id="emailAddress"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className={cx('login-input')}
                        type="text"
                        name="activationCode"
                        id="activationCode"
                        placeholder="Mã kích hoạt tài khoản (Nếu có)"
                        onChange={(e) => setCode(e.target.value)}
                    />
                    <div className={cx('user-remember-forget')}>
                        <div>
                            <input className={cx('display-block')} type="checkbox" name="remember" id="remember" />
                            <label htmlFor="remember">Nhớ mật khẩu</label>
                        </div>
                        <div className={cx('user-forget')}>
                            <a href="/">
                                <button type="button">Quên mật khẩu</button>
                            </a>
                        </div>
                    </div>
                    {stateRegister === false && (
                        <span className={cx('d-flex align-items-center')}>
                            <FaCircleXmark className={cx('text-danger')} />
                            <span className={cx('text-danger', 'px-2')}>{notification}</span>
                        </span>
                    )}
                    <div className={cx('text-center', 'btn-login')}>
                        <button type="submit" onClick={handleLogin}>
                            Đăng ký
                        </button>
                    </div>
                </div>
                <div className={cx('text-center', 'container-hotline')}>
                    <div>
                        <span>Đã có tài khoản?</span>
                        <Link to="/login">Đăng nhập</Link>
                    </div>
                    <div>
                        <span>Hotline hỗ trợ: </span>
                        <a href="/">0836759850</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;
