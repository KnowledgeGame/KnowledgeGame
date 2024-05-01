/* eslint-disable jsx-a11y/img-redundant-alt */
import {
    faAngleLeft,
    faBook,
    faBookOpen,
    faBookOpenReader,
    faChartSimple,
    faCircle,
    faMoneyCheckDollar,
    faReceipt,
    faSearch,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './SideNav.module.scss';
import images from '~/assets/images';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);
function SideNav() {
    const username = sessionStorage.getItem('taiKhoan');
    const position = sessionStorage.getItem('position');
    const [stateTheorys, setStateTheorys] = useState(-1);
    const [stateAccounts, setStateAccounts] = useState(-1);
    const [stateTransactions, setStateTransactions] = useState(-1);

    const handleLogout = () => {
        // Xóa dữ liệu từ key 'taiKhoan' trong sessionStorage
        sessionStorage.removeItem('taiKhoan');
        // Xóa dữ liệu từ key 'position' trong sessionStorage
        sessionStorage.removeItem('position');
    };
    return (
        <div>
            {' '}
            {/* Main Sidebar Container */}
            <aside className={cx('main-sidebar', ' sidebar-dark-primary ', 'elevation-4', 'wrap-side-nav')}>
                {/* Brand Logo */}
                <Link to="/admin/home" className="brand-link">
                    <img
                        src={images.logo}
                        alt="AdminLTE Logo"
                        className="brand-image img-circle elevation-3"
                        style={{ opacity: '.8' }}
                    />
                    <span className="brand-text font-weight-light">Shop Kiến Thức</span>
                </Link>
                {/* Sidebar */}
                <div className={cx('sidebar', 'wrap-sidebar')}>
                    {/* Sidebar user panel (optional) */}
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex justify-content-between align-items-center">
                        <div className="image">
                            <img src={images.icon_ranking} className="img-circle elevation-2" alt="User Image" />
                        </div>
                        <div className="info">
                            <a href="/admin" className="d-block">
                                {username}
                            </a>
                        </div>
                        <div>
                            <a className={cx('logout')} href="/" onClick={handleLogout}>
                                Đăng xuất
                            </a>
                        </div>
                    </div>
                    {/* SidebarSearch Form */}
                    <div className="form-inline">
                        <div className="input-group" data-widget="sidebar-search">
                            <input
                                className="form-control form-control-sidebar"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />
                            <div className="input-group-append">
                                <button className="btn btn-sidebar">
                                    <FontAwesomeIcon icon={faSearch} />
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Sidebar Menu */}
                    <nav className="mt-2">
                        <ul
                            className={cx('nav', 'nav-pills', 'nav-sidebar', 'flex-column', 'wrap-menu-nav')}
                            data-widget="treeview"
                            role="menu"
                            data-accordion="false"
                        >
                            {/* Add icons to the links using the .nav-icon class
           with font-awesome or any other icon font library */}

                            <li class="nav-item">
                                <Link to="/admin/subjects" class="nav-link active">
                                    <div className="row">
                                        <div className="col-4 d-flex justify-content-center align-items-center">
                                            <FontAwesomeIcon icon={faBookOpenReader} />
                                        </div>
                                        <div className="col-4 d-flex justify-content-center align-items-center">
                                            <p>Subjects</p>
                                        </div>
                                        <div className="col-4 d-flex justify-content-center align-items-center">
                                            <FontAwesomeIcon icon={faAngleLeft} />
                                        </div>
                                    </div>
                                </Link>
                                {/* <ul class="nav nav-treeview">
                                    <li class={cx('nav-header', 'title-subjects')}>Back End</li>
                                    <li class="nav-item">
                                        <a href="pages/charts/chartjs.html" class="nav-link">
                                            <div className="row">
                                                <div className="col-4 d-flex justify-content-center align-items-center">
                                                    <FontAwesomeIcon icon={faCircle} className="nav-icon" />
                                                </div>

                                                <div className="col-4 d-flex justify-content-center align-items-center">
                                                    <p> Python</p>
                                                </div>
                                            </div>
                                        </a>
                                    </li>

                                    <li class="nav-item">
                                        <a href="pages/charts/flot.html" class="nav-link">
                                            <div className="row">
                                                <div className="col-4 d-flex justify-content-center align-items-center">
                                                    <FontAwesomeIcon icon={faCircle} className="nav-icon" />
                                                </div>

                                                <div className="col-4 d-flex justify-content-center align-items-center">
                                                    <p>Javascript</p>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li class={cx('nav-header', 'title-subjects')}>Front End</li>
                                    <li class="nav-item">
                                        <a href="pages/charts/inline.html" class="nav-link">
                                            <div className="row">
                                                <div className="col-4 d-flex justify-content-center align-items-center">
                                                    <FontAwesomeIcon icon={faCircle} className="nav-icon" />
                                                </div>

                                                <div className="col-4 d-flex justify-content-center align-items-center">
                                                    <p>HTML</p>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                </ul> */}
                            </li>

                            {/* Teacher */}
                            <li class={cx('nav-item', 'cursor-pointer')}>
                                <div class="nav-link active" onClick={() => setStateTheorys(-stateTheorys)}>
                                    <div className="row">
                                        <div className="col-4 d-flex justify-content-center align-items-center">
                                            <FontAwesomeIcon icon={faBookOpen} />
                                        </div>
                                        <div className="col-4 d-flex justify-content-center align-items-center">
                                            <p>Theorys</p>
                                        </div>
                                        <div className="col-4 d-flex justify-content-center align-items-center">
                                            <FontAwesomeIcon icon={faAngleLeft} />
                                        </div>
                                    </div>
                                </div>
                                {stateTheorys && (
                                    <ul class="nav nav-treeview">
                                        <li class="nav-item">
                                            <Link to="/admin/titleContents" class="nav-link">
                                                <div className="row">
                                                    <div className="col-4 d-flex justify-content-center align-items-center">
                                                        <FontAwesomeIcon icon={faCircle} className="nav-icon" />
                                                    </div>

                                                    <div className="col-4 d-flex justify-content-center align-items-center">
                                                        <p>Titles</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </li>
                                        <li class="nav-item">
                                            <Link to="/admin/contentSubjects" class="nav-link">
                                                <div className="row">
                                                    <div className="col-4 d-flex justify-content-center align-items-center">
                                                        <FontAwesomeIcon icon={faCircle} className="nav-icon" />
                                                    </div>

                                                    <div className="col-4 d-flex justify-content-center align-items-center">
                                                        <p>Contents</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </li>

                            <li class="nav-item">
                                <Link to="/admin/questions" class="nav-link active">
                                    <div className="row">
                                        <div className="col-4 d-flex justify-content-center align-items-center">
                                            <FontAwesomeIcon icon={faReceipt} />
                                        </div>
                                        <div className="col-4 d-flex justify-content-center align-items-center">
                                            <p>Questions</p>
                                        </div>
                                        <div className="col-4 d-flex justify-content-center align-items-center">
                                            <FontAwesomeIcon icon={faAngleLeft} />
                                        </div>
                                    </div>
                                </Link>
                            </li>

                            {/* Admin */}
                            {position && position === 'Admin' && (
                                <>
                                    <li class="nav-item">
                                        <Link to="/admin/courses" class="nav-link active">
                                            <div className="row">
                                                <div className="col-4 d-flex justify-content-center align-items-center">
                                                    <FontAwesomeIcon icon={faBook} />
                                                </div>
                                                <div className="col-4 d-flex justify-content-center align-items-center">
                                                    <p>Courses</p>
                                                </div>
                                                <div className="col-4 d-flex justify-content-center align-items-center">
                                                    <FontAwesomeIcon icon={faAngleLeft} />
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="nav-item menu-open">
                                        <div
                                            className={cx('nav-link', 'active', 'cursor-pointer')}
                                            onClick={() => setStateAccounts(-stateAccounts)}
                                        >
                                            <div className="row">
                                                <div className="col-4 d-flex justify-content-center align-items-center">
                                                    <FontAwesomeIcon icon={faUsers} />
                                                </div>
                                                <div className="col-4 d-flex justify-content-center align-items-center">
                                                    <p>Accounts</p>
                                                </div>
                                                <div className="col-4 d-flex justify-content-center align-items-center">
                                                    <FontAwesomeIcon icon={faAngleLeft} />
                                                </div>
                                            </div>
                                        </div>
                                        {stateAccounts && (
                                            <ul className="nav nav-treeview">
                                                <li className="nav-item">
                                                    <Link to="/admin/students" className="nav-link">
                                                        <div className="row">
                                                            <div className="col-4 d-flex justify-content-center align-items-center">
                                                                <FontAwesomeIcon icon={faCircle} className="nav-icon" />
                                                            </div>

                                                            <div className="col-4 d-flex justify-content-center align-items-center">
                                                                <p>Students</p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to="/admin/teachers" className="nav-link">
                                                        <div className="row">
                                                            <div className="col-4 d-flex justify-content-center align-items-center">
                                                                <FontAwesomeIcon icon={faCircle} className="nav-icon" />
                                                            </div>

                                                            <div className="col-4 d-flex justify-content-center align-items-center">
                                                                <p>Teachers</p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </li>
                                            </ul>
                                        )}
                                    </li>
                                    <li className={cx('nav-item', 'menu-open', 'cursor-pointer')}>
                                        <div
                                            className="nav-link active"
                                            onClick={() => setStateTransactions(-stateTransactions)}
                                        >
                                            <div className="row">
                                                <div className="col-4 d-flex justify-content-center align-items-center">
                                                    <FontAwesomeIcon icon={faMoneyCheckDollar} />
                                                </div>
                                                <div className="col-4 d-flex justify-content-center align-items-center">
                                                    <p>Transactions</p>
                                                </div>
                                                <div className="col-4 d-flex justify-content-center align-items-center">
                                                    <FontAwesomeIcon icon={faAngleLeft} />
                                                </div>
                                            </div>
                                        </div>
                                        {stateTransactions && (
                                            <ul className="nav nav-treeview">
                                                <li className="nav-item">
                                                    <Link to="/admin/transactionStudents" className="nav-link">
                                                        <div className="row">
                                                            <div className="col-4 d-flex justify-content-center align-items-center">
                                                                <FontAwesomeIcon icon={faCircle} className="nav-icon" />
                                                            </div>

                                                            <div className="col-4 d-flex justify-content-center align-items-center">
                                                                <p>Students</p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to="/admin/transactionTeachers" className="nav-link">
                                                        <div className="row">
                                                            <div className="col-4 d-flex justify-content-center align-items-center">
                                                                <FontAwesomeIcon icon={faCircle} className="nav-icon" />
                                                            </div>

                                                            <div className="col-4 d-flex justify-content-center align-items-center">
                                                                <p>Teachers</p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </li>
                                            </ul>
                                        )}
                                    </li>
                                    <li className="nav-item menu-open">
                                        <Link to="/admin/statistics" className="nav-link active">
                                            <div className="row">
                                                <div className="col-4 d-flex justify-content-center align-items-center">
                                                    <FontAwesomeIcon icon={faChartSimple} />
                                                </div>
                                                <div className="col-4 d-flex justify-content-center align-items-center">
                                                    <p>Statistics</p>
                                                </div>
                                                <div className="col-4 d-flex justify-content-center align-items-center">
                                                    <FontAwesomeIcon icon={faAngleLeft} />
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </nav>
                    {/* /.sidebar-menu */}
                </div>
                {/* /.sidebar */}
            </aside>
        </div>
    );
}

export default SideNav;
