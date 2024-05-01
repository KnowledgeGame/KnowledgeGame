import { Link, useParams } from 'react-router-dom';
import style from './Exercise.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(style);

function Exercise() {
    const { course, subject, bai, idCS } = useParams();
    const [questions, setQuestions] = useState();
    const [percentTwig, setPercentTwig] = useState(0);
    const [percentUnderstanding, setPercentUnderstanding] = useState(0);
    const [percentManipulate, setPercentManipulate] = useState(0);
    const [percentHighlyApplicable, setPercentHighlyApplicable] = useState(0);
    const [contentSubjectOne, setContentSubjectOne] = useState();
    const [loading, setLoading] = useState(true); // Biến state để đánh dấu trạng thái tải dữ liệu
    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/contentSubjectOne/?nameSubject=${subject}&idCS=${idCS}`)
            .then((res) => {
                setContentSubjectOne(res.data);
                setLoading(false); // Khi dữ liệu đã được tải, đặt loading thành false
            })
            .catch(() => {
                setLoading(false); // Xử lý lỗi cũng đặt loading thành false
            });
    }, [subject, idCS]);

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/questionsSubjectList/?idCS=${idCS}`)
            .then((res) => {
                setQuestions(res.data);
                setLoading(false); // Khi dữ liệu đã được tải, đặt loading thành false
            })
            .catch(() => {
                setLoading(false); // Xử lý lỗi cũng đặt loading thành false
            });
    }, [subject, idCS]);

    // console.log(questions.questions);
    useEffect(() => {
        let totalTwig = 0;
        let totalUnderstanding = 0;
        let totalManipulate = 0;
        let totalHighlyApplicable = 0;
        if (questions) {
            questions.questions.forEach((question) => {
                if (question.levelOfDifficult === 'Nhận biết') {
                    totalTwig += 1;
                }
                if (question.levelOfDifficult === 'Thông hiểu') {
                    totalUnderstanding += 1;
                }
                if (question.levelOfDifficult === 'Vận dụng') {
                    totalManipulate += 1;
                }
                if (question.levelOfDifficult === 'Vận dụng cao') {
                    totalHighlyApplicable += 1;
                }
            });
            setPercentTwig(parseInt((totalTwig * 100) / Object.keys(questions.questions).length));
            setPercentUnderstanding(parseInt((totalUnderstanding * 100) / Object.keys(questions.questions).length));
            setPercentManipulate(parseInt((totalManipulate * 100) / Object.keys(questions.questions).length));
            setPercentHighlyApplicable(
                parseInt((totalHighlyApplicable * 100) / Object.keys(questions.questions).length),
            );
        }
    }, [questions]);
    // Nếu đang tải dữ liệu, hiển thị một phần giao diện loading
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className={cx(' container-fluid align-center p-3 ', 'container-wrap-bai-tap')}>
            <div className={cx('bg-white mb-4 rounded ', 'wrap-content-bai-tap')}>
                {contentSubjectOne && contentSubjectOne.content_subjects && (
                    <span className={cx('title-bai-tap', 'text-center')}>
                        Bài {bai}: {contentSubjectOne.content_subjects[0].nameContent}
                    </span>
                )}
                <div className={cx('row p-3 pb-2')}>
                    <div className={cx('col-4')}>
                        <div className={cx('label-progress')}>Nhận biết ({percentTwig}%)</div>
                    </div>
                    <div className={cx('col-8')}>
                        <div className={cx('progress')}>
                            <div
                                className={cx('progress-bar', 'bg-primary')}
                                role="progressbar"
                                style={{ width: `${percentTwig}%` }}
                                aria-valuenow={percentTwig}
                                aria-valuemin="0"
                                aria-valuemax="100"
                            ></div>
                        </div>
                    </div>
                </div>

                <div className={cx('row p-3 pt-1 pb-2')}>
                    <div className={cx('col-4')}>
                        <div className={cx('label-progress')}>Thông hiểu ({percentUnderstanding}%)</div>
                    </div>
                    <div className={cx('col-8')}>
                        <div className={cx('progress')}>
                            <div
                                className={cx('progress-bar', 'bg-success')}
                                role="progressbar"
                                style={{ width: `${percentUnderstanding}%` }}
                                aria-valuenow={percentUnderstanding}
                                aria-valuemin="0"
                                aria-valuemax="100"
                            ></div>
                        </div>
                    </div>
                </div>

                <div className={cx('row p-3 pt-1 pb-2')}>
                    <div className={cx('col-4')}>
                        <div className={cx('label-progress')}>Vận dụng ({percentManipulate}%)</div>
                    </div>
                    <div className={cx('col-8')}>
                        <div className={cx('progress')}>
                            <div
                                className={cx('progress-bar', 'bg-warning')}
                                role="progressbar"
                                style={{ width: `${percentManipulate}%` }}
                                aria-valuenow={percentManipulate}
                                aria-valuemin="0"
                                aria-valuemax="100"
                            ></div>
                        </div>
                    </div>
                </div>

                <div className={cx('row p-3 pt-1 pb-2')}>
                    <div className={cx('col-4')}>
                        <div className={cx('label-progress')}>Vận dụng cao ({percentHighlyApplicable}%)</div>
                    </div>
                    <div className={cx('col-8')}>
                        <div className={cx('progress')}>
                            <div
                                className={cx('progress-bar', 'bg-danger')}
                                role="progressbar"
                                style={{ width: `${percentHighlyApplicable}%` }}
                                aria-valuenow={percentHighlyApplicable}
                                aria-valuemin="0"
                                aria-valuemax="100"
                            ></div>
                        </div>
                    </div>
                </div>

                <div className={cx('p-3')}>
                    <div className={cx('d-flex', 'wrap-note-exercise')}>
                        <div className={cx('number-note-exercise')}>1</div>
                        <span className={cx('note-exercise')}>Làm xong biết đáp án, phương pháp giải chi tiết.</span>
                    </div>
                    <div className={cx('d-flex ', 'wrap-note-exercise')}>
                        <div className={cx('number-note-exercise')}>2</div>
                        <span className={cx('note-exercise')}>Học sinh có thể hỏi và trao đổi lại nếu không hiểu.</span>
                    </div>
                    <div className={cx('d-flex ', 'wrap-note-exercise')}>
                        <div className={cx('number-note-exercise')}>3</div>
                        <span className={cx('note-exercise')}>Xem lại lý thuyết, lưu bài tập, note lại các chú ý.</span>
                    </div>
                    <div className={cx('d-flex ', 'wrap-note-exercise')}>
                        <div className={cx('number-note-exercise')}>4</div>
                        <span className={cx('note-exercise')}>Biết điểm yếu và có hướng giải pháp cải thiện.</span>
                    </div>
                </div>

                <div class={cx('wrap-link-do-exercise', 'p-4')}>
                    <div>
                        <Link
                            className={cx('link-bai-tap-end')}
                            to={`/courses/${course}/${subject}/LamBaiTap/${idCS}/${bai}`}
                        >
                            Bắt đầu
                            <FontAwesomeIcon className={cx('icon-link-bai-tap')} icon={faAnglesRight} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Exercise;
