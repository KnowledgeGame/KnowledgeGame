import classNames from 'classnames/bind';
import { useState, useContext } from 'react';
import axios from 'axios';
import style from './Login.module.scss';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '~/context/authcontext';
const cx = classNames.bind(style);

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [account, setAccount] = useState('');
    const [checkAdmin, setCheckAdmin] = useState(-1);
    const [state, setState] = useState(-1);

    const navigate = useNavigate();
    const { setUser, setPosition, position } = useContext(AuthContext);
    const handleLogin = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/checkAccount/', {
                username: username,
                password: password,
                position: checkAdmin,
            });
            setAccount(response.data);
            setUser(response.data);
            setPosition(response.data.position);
            setState(1);
            // Lưu dữ liệu vào Session Storage
            sessionStorage.setItem('taiKhoan', response.data.accountName);
            sessionStorage.setItem('position', response.data.position);

            if (response.data && response.data.position === 'Student') {
                navigate('/');
            }
            if (response.data && (response.data.position === 'Teacher' || response.data.position === 'Admin')) {
                navigate('/admin/home');
            }
        } catch (error) {
            setState(0);
            console.error('Đăng nhập thất bại:', error.response.data);
        }
    };

    // const handleLogin = async () => {
    //     try {
    //         const response = await axios.post('http://127.0.0.1:8000/api/studentsAccount/', {
    //             username: username,
    //             password: password,
    //         });
    //         const token = response.data.token;
    //         // Lưu trữ token vào local storage hoặc cookie
    //         localStorage.setItem('token', token);

    //         // Kiểm tra token sau khi đăng nhập thành công
    //         try {
    //             // Lấy token từ local storage
    //             const token = localStorage.getItem('token');
    //             const response = await axios.get('http://localhost:8000/api/studentsAccount/protected/', {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             });
    //             setUser(response.data.account);
    //             navigate('/');
    //         } catch (error) {
    //             console.error('Failed to fetch data:', error);
    //         }
    //     } catch (error) {
    //         console.error('Đăng nhập thất bại:', error.response.data);
    //     }
    // };

    return (
        <div className={cx('d-flex justify-content-center container-fluid')}>
            <div className={cx('contain-login')}>
                <div className={cx('element-space')}>
                    <div className={cx('text-center', 'login-title')}>Đăng nhập</div>
                    <div className={cx('text-center', 'login-outside')}>
                        <button className={cx('btn-login-facebook')}>Đăng nhập bằng Facebook</button>
                        <button className={cx('btn-login-gmail')}>Đăng nhập bằng Google</button>
                    </div>
                    <div className={cx('text-center', 'login-or')}>Hoặc</div>
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
                    <div className={cx('user-remember-forget')}>
                        <div className={cx('wrap-remember')}>
                            <input className={cx('display-block')} type="checkbox" name="remember" id="remember" />
                            <label htmlFor="remember">Nhớ mật khẩu</label>
                        </div>
                        <div className={cx('user-forget')}>
                            <a href="/">
                                <button type="button">Quên mật khẩu</button>
                            </a>
                        </div>
                    </div>
                    <div>
                        <input
                            className={cx('display-block')}
                            type="checkbox"
                            name="checkAdmin"
                            id="checkAdmin"
                            onChange={() => setCheckAdmin(-checkAdmin)}
                        />
                        <label htmlFor="checkAdmin" className="pl-2 font-italic ">
                            Bạn là giáo viên hoặc admin?
                        </label>
                    </div>
                    {state === 0 && (
                        <div>
                            <p className="text-danger text-center">Tài khoản hoặc mật khẩu không chính xác!</p>
                        </div>
                    )}
                    <div className={cx('text-center', 'btn-login')}>
                        <button type="submit" onClick={handleLogin}>
                            Đăng nhập
                        </button>
                    </div>
                </div>
                <div className={cx('text-center', 'container-hotline')}>
                    <div>
                        <span>Chưa có tài khoản?</span>
                        <Link to="/register">Đăng ký</Link>
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
