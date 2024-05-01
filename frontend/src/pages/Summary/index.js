import classNames from 'classnames/bind';
import { Link, useParams } from 'react-router-dom';
import style from './Summary.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(style);

function Summary() {
    const { point, time, totalQuestions, subject, course } = useParams();
    return (
        <div className="container d-flex justify-content-center">
            <div className={cx('background-point')}>
                <div className={cx('wrap-point')}>
                    <div>
                        <div className={cx('wrap-zone-point')}>
                            <span className={cx('h-100 p-1 text-center text-light', 'content-pointed')}>
                                Số điểm đạt được
                            </span>
                            <span className={cx('h-100 text-center p-3')}>{point}/100</span>
                        </div>
                    </div>
                    <div>
                        <div className={cx('wrap-zone-point', 'mt-3')}>
                            <span className={cx('h-100 p-1 text-center', 'content-time')}>Thời gian làm bài</span>
                            <span className={cx('h-100 text-center p-3')}>{time}</span>
                        </div>
                    </div>
                    <div>
                        <div className={cx('wrap-zone-point', 'mt-3')}>
                            <span className={cx('h-100 p-1 text-center', 'content-point-answered')}>Số câu đã làm</span>
                            <span className={cx('h-100 text-center p-3')}>{totalQuestions}/20</span>
                        </div>
                    </div>
                    <div className={cx('p-2', 'content')}>Chúc mừng bạn đã hoàn thành thử thách!</div>
                    <div className="d-flex justify-content-between">
                        <div className={cx('wrap-button', 'bg-warning')}>
                            <FontAwesomeIcon icon={faAnglesLeft} className={cx('icon-next-question', 'pr-2')} />
                            <span>
                                <Link to="/">Quay lại</Link>
                            </span>
                        </div>
                        <div className={cx('wrap-button')}>
                            <span>
                                <Link to={`/courses/${course}/${subject}/TracNghiem`}>Làm tiếp</Link>
                            </span>
                            <FontAwesomeIcon icon={faAnglesRight} className={cx('icon-next-question', 'pl-2')} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Summary;
