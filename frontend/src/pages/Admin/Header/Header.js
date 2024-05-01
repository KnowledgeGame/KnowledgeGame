import React, { useState } from 'react';
import classNames from 'classnames/bind';
import style from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell, faComments, faMaximize } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(style);
function Header() {
    const [state, setState] = useState(-1);
    const handleState = () => {
        setState(-state);
    };
    return (
        <div>
            {/* Navbar */}
            <nav
                className={cx('main-header', 'navbar', 'navbar-expand', 'navbar-white', 'navbar-light', 'wrap-header', {
                    'w-100': state === 1,
                })}
            >
                {/* Left navbar links */}
                <ul className="navbar-nav">
                    <li className={cx('nav-item')}>
                        <a className={cx('nav-link')} data-widget="pushmenu" href="#" role="button">
                            <FontAwesomeIcon icon={faBars} onClick={handleState} />
                        </a>
                    </li>
                    <li className={cx('nav-item d-none d-sm-inline-block')}>
                        <a href="index3.html" className={cx('nav-link')}>
                            Home
                        </a>
                    </li>
                    <li className={cx('nav-item d-none d-sm-inline-block')}>
                        <a href="#" className={cx('nav-link')}>
                            Contact
                        </a>
                    </li>
                </ul>
                {/* Right navbar links */}
                <ul className={cx('wrap-icon-menu-suport', 'navbar-nav', 'ml-auto')}>
                    {/* Messages Dropdown Menu */}
                    <li className="nav-item dropdown">
                        <a className="nav-link" data-toggle="dropdown" href="#">
                            <FontAwesomeIcon icon={faComments} />
                            <span className={cx('badge', 'badge-danger', 'navbar-badge')}>3</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                            <a href="#" className="dropdown-item">
                                {/* Message Start */}
                                <div className="media">
                                    <img
                                        src="dist/img/user1-128x128.jpg"
                                        alt="User Avatar"
                                        className="img-size-50 mr-3 img-circle"
                                    />
                                    <div className={cx('media-body')}>
                                        <h3 className={cx('dropdown-item-title')}>
                                            Brad Diesel
                                            <span className={cx('float-right text-sm text-danger')}>
                                                <i className={cx('fas fa-star')} />
                                            </span>
                                        </h3>
                                        <p className={cx('text-sm')}>Call me whenever you can...</p>
                                        <p className={cx('text-sm text-muted')}>
                                            <FontAwesomeIcon icon={faBell} /> 4 Hours Ago
                                        </p>
                                    </div>
                                </div>
                                {/* Message End */}
                            </a>
                            <div className="dropdown-divider" />
                            <a href="#" className="dropdown-item">
                                {/* Message Start */}
                                <div className="media">
                                    <img
                                        src="dist/img/user8-128x128.jpg"
                                        alt="User Avatar"
                                        className="img-size-50 img-circle mr-3"
                                    />
                                    <div className="media-body">
                                        <h3 className="dropdown-item-title">
                                            John Pierce
                                            <span className="float-right text-sm text-muted">
                                                <i className="fas fa-star" />
                                            </span>
                                        </h3>
                                        <p className="text-sm">I got your message bro</p>
                                        <p className="text-sm text-muted">
                                            <i className="far fa-clock mr-1" /> 4 Hours Ago
                                        </p>
                                    </div>
                                </div>
                                {/* Message End */}
                            </a>
                            <div className="dropdown-divider" />
                            <a href="#" className="dropdown-item">
                                {/* Message Start */}
                                <div className="media">
                                    <img
                                        src="dist/img/user3-128x128.jpg"
                                        alt="User Avatar"
                                        className="img-size-50 img-circle mr-3"
                                    />
                                    <div className="media-body">
                                        <h3 className="dropdown-item-title">
                                            Nora Silvester
                                            <span className="float-right text-sm text-warning">
                                                <i className="fas fa-star" />
                                            </span>
                                        </h3>
                                        <p className="text-sm">The subject goes here</p>
                                        <p className="text-sm text-muted">
                                            <i className="far fa-clock mr-1" /> 4 Hours Ago
                                        </p>
                                    </div>
                                </div>
                                {/* Message End */}
                            </a>
                            <div className="dropdown-divider" />
                            <a href="#" className="dropdown-item dropdown-footer">
                                See All Messages
                            </a>
                        </div>
                    </li>
                    {/* Notifications Dropdown Menu */}
                    <li className="nav-item dropdown">
                        <a className="nav-link" data-toggle="dropdown" href="#">
                            <FontAwesomeIcon icon={faBell} />
                            <span className={cx('badge', 'badge-warning', 'navbar-badge')}>15</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                            <span className="dropdown-item dropdown-header">15 Notifications</span>
                            <div className="dropdown-divider" />
                            <a href="#" className="dropdown-item">
                                <i className="fas fa-envelope mr-2" /> 4 new messages
                                <span className="float-right text-muted text-sm">3 mins</span>
                            </a>
                            <div className="dropdown-divider" />
                            <a href="#" className="dropdown-item">
                                <i className="fas fa-users mr-2" /> 8 friend requests
                                <span className="float-right text-muted text-sm">12 hours</span>
                            </a>
                            <div className="dropdown-divider" />
                            <a href="#" className="dropdown-item">
                                <i className="fas fa-file mr-2" /> 3 new reports
                                <span className="float-right text-muted text-sm">2 days</span>
                            </a>
                            <div className="dropdown-divider" />
                            <a href="#" className="dropdown-item dropdown-footer">
                                See All Notifications
                            </a>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                            <FontAwesomeIcon icon={faMaximize} />
                        </a>
                    </li>
                </ul>
            </nav>
            {/* /.navbar */}
        </div>
    );
}

export default Header;
