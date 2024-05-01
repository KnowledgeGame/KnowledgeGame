import style from './Content.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import { Link, useParams } from 'react-router-dom';
const cx = classNames.bind(style);

function ContentCourse() {
    var { subject } = useParams();
    var { course } = useParams();
    if (subject === undefined) {
        switch (course) {
            case 'BackEnd':
                subject = 'Python';
                break;
            case 'FrontEnd':
                subject = 'HTML';
                break;
            case 'AI':
                subject = 'Data Analyst';
                break;
            default:
                console.log('Default action');
        }
    }

    return (
        <div className={cx('container', 'container-courses')}>
            <h4>Bạn đã chọn {subject}. Chọn phần bạn muốn luyện. </h4>
            <div className={cx('d-flex row', 'container-menu-course')}>
                <div className={cx('m-4 col-3')}>
                    <ul>
                        <li className={cx('')}>
                            <Link
                                className={cx(
                                    'd-flex flex-column align-items-center justify-content-center text-center',
                                    'a-course',
                                )}
                                to={`/courses/${course}/${subject}/TracNghiem`}
                            >
                                <img src={images.tracNghiem} alt="Trắc nghiệm" />
                                <span className={cx('text-dark', 'span-course')}>Luyện bài tập trắc nghiệm</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={cx('m-4 col-3')}>
                    <ul>
                        <li className={cx('')}>
                            <Link
                                className={cx(
                                    'd-flex flex-column align-items-center justify-content-center text-center',
                                    'a-course',
                                )}
                                to={`/courses/${course}/${subject}/MenuLyThuyet`}
                            >
                                <img src={images.lyThuyet} alt="Lý thuyết" />
                                <span className={cx('text-dark', 'span-course')}>Ôn lý thuyết</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={cx('m-4 col-3')}>
                    <ul>
                        <li className={cx('')}>
                            <Link
                                className={cx(
                                    'd-flex flex-column align-items-center justify-content-center text-center',
                                    'a-course',
                                )}
                                href="abc"
                            >
                                <img src={images.lamDeThi} alt="Đề thi" />
                                <span className={cx('text-dark', 'span-course')}>Làm đề thi</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={cx('m-4 col-3')}>
                    <ul>
                        <li className={cx('')}>
                            <Link
                                className={cx(
                                    'd-flex flex-column align-items-center justify-content-center text-center',
                                    'a-course',
                                )}
                                href="abc"
                            >
                                <img src={images.cacCauSai} alt="Các câu làm sai" />
                                <span className={cx('text-dark', 'span-course')}>Các câu làm sai</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={cx('m-4 col-3')}>
                    <ul>
                        <li className={cx('')}>
                            <Link
                                className={cx(
                                    'd-flex flex-column align-items-center justify-content-center text-center',
                                    'a-course',
                                )}
                                href="abc"
                            >
                                <img src={images.thiDau} alt="Thi đấu" />
                                <span className={cx('text-dark', 'span-course')}>Thi đấu</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ContentCourse;
