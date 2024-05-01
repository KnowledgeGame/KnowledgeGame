import axios from 'axios';
import style from './Header.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState, useContext } from 'react';
import image from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faUser } from '@fortawesome/free-solid-svg-icons';
import { faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import { AuthContext } from '~/context/authcontext';

const cx = classNames.bind(style);

function Header() {
    const [courses, setCourses] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const { user, setUser } = useContext(AuthContext);
    const [isHover, setIsHover] = useState(false);

    const firstSubjectOfCourse = ['Python', 'HTML', 'Data Analyst'];

    const handleLogout = () => {
        setUser('');
        // Xóa dữ liệu từ key 'taiKhoan' trong sessionStorage
        sessionStorage.removeItem('taiKhoan');
        // Xóa dữ liệu từ key 'position' trong sessionStorage
        sessionStorage.removeItem('position');
    };

    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = image.logo_removebg;
        document.head.appendChild(link);

        const existingLink = document.querySelector('link[rel="icon"]');
        if (existingLink) {
            document.head.removeChild(existingLink);
        }
        document.title = 'Shop kiến thức';
    }, []);

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/course/')
            .then((res) => {
                setCourses(res.data);
            })
            .catch((error) => {
                console.error('Lỗi khi tải các khóa học:', error);
            });
    }, []);

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/subject/')
            .then((res) => {
                setSubjects(res.data);
            })
            .catch((error) => {
                console.error('Lỗi khi tải các môn học:', error);
            });
    }, []);

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <Link to="/">
                        <img className={cx('img-logo')} src={image.logo} alt="Logo" />
                    </Link>
                </div>
                <div className={cx('nav')}>
                    <nav>
                        <ul className={cx('list-style-menu')}>
                            {courses.map((course) => (
                                <li key={course.nameCourse} className={cx('list-style-content')}>
                                    <Link
                                        className={cx('list-style-a')}
                                        to={`/courses/${course.nameCourse}/${
                                            firstSubjectOfCourse[course.idCourse - 1]
                                        }`}
                                    >
                                        {course.nameCourse} <FontAwesomeIcon icon={faCaretDown} />
                                    </Link>
                                    <ul className={cx('list-style-subject', 'w-100')}>
                                        {subjects.map((subject) => {
                                            if (subject.idCourse === course.idCourse) {
                                                return (
                                                    <li
                                                        key={subject.nameSubject}
                                                        className={cx('list-style-subject-li')}
                                                    >
                                                        <Link
                                                            className={cx('list-style-subject-a')}
                                                            to={`/courses/${course.nameCourse}/${subject.nameSubject}`}
                                                        >
                                                            {subject.nameSubject}
                                                        </Link>
                                                    </li>
                                                );
                                            }
                                            return null;
                                        })}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                <div className={cx('header-not-login')}>
                    <div>
                        {user && user.accountName ? (
                            <span className={cx('dang-nhap')}>Xin chào</span>
                        ) : (
                            <div className={cx('dang-nhap')}>
                                <FontAwesomeIcon icon={faUser} />
                                <Link className={cx('header-not-login-a')} to="/login">
                                    Đăng nhập
                                </Link>
                            </div>
                        )}
                    </div>
                    <div>
                        <div className={cx('divider')}></div>
                    </div>
                    <div>
                        {user && user.accountName ? (
                            <div className={cx('user-name')} onMouseLeave={() => setIsHover(false)}>
                                <div className={cx('dang-nhap')} onMouseEnter={() => setIsHover(true)}>
                                    <span className={cx('dang-nhap')}>{user.accountName}</span>
                                </div>
                                {isHover && (
                                    <div className={cx('wrap-menu-option-user')}>
                                        <div className={cx('menu-option-user')}>
                                            <ul>
                                                <li>
                                                    <Link to="/code">Thông tin cá nhân</Link>
                                                </li>
                                                <li>
                                                    <Link to="/code">Mã kích hoạt</Link>
                                                </li>
                                                <li>
                                                    <Link to="/code">Đổi mật khẩu</Link>
                                                </li>
                                                <li>
                                                    <Link to="/code">Kết quả học tập</Link>
                                                </li>
                                                <li>
                                                    <Link to="/code">Lịch sử giao dịch</Link>
                                                </li>
                                                <li onClick={handleLogout}>Đăng xuất</li>
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div>
                                <div className={cx('dang-ky')}>
                                    <FontAwesomeIcon icon={faSquareCheck} />
                                    <Link className={cx('header-not-login-a', 'dang-ky')} to="/register">
                                        Đăng ký
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
