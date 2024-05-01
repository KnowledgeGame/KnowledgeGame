import { useParams, useNavigate, Link } from 'react-router-dom';
import style from './DoExercise.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from '~/context/authcontext';

import {
    faAnglesDown,
    faAnglesRight,
    faCircleExclamation,
    faDownload,
    faFilePen,
    faLightbulb,
    faPenToSquare,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import image from '~/assets/images';

const cx = classNames.bind(style);

function DoExercise() {
    const [questions, setQuestions] = useState();
    const [checkAnswer, setCheckAnswer] = useState(2);
    const [checkSeeExplanation, setCheckSeeExplanation] = useState(0);
    const { subject, idCS, course, bai } = useParams();
    const [selectedOption, setSelectedOption] = useState('');
    const [loading, setLoading] = useState(true); // Biến state để đánh dấu trạng thái tải dữ liệu
    const [nowQuestion, setNowQuestion] = useState(1);
    const [showImgStatus, setShowImgStatus] = useState(null);
    const [imgNow, setImgNow] = useState('');
    const [point, setPoint] = useState(0);
    const [timeDoIt, setTimeDoIt] = useState(0);
    const [formatTime, setFormatTime] = useState('');

    let totalQuestionsDone = '';
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    // -------------------------------------------------------------------------
    // Format sang định dạng 00:00:00
    useEffect(() => {
        setTimeout(() => {
            setTimeDoIt(timeDoIt + 1);
            var hours = Math.floor(timeDoIt / 3600);
            var minutes = Math.floor((timeDoIt % 3600) / 60);
            var seconds = Math.floor((timeDoIt % 3600) % 60);
            setFormatTime(padZero(hours) + ':' + padZero(minutes) + ':' + padZero(seconds));
        }, 1000);
    }, [timeDoIt]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowImgStatus(null);
        }, 2000);

        return () => clearTimeout(timeout);
    }, [showImgStatus]);

    const padZero = (num) => {
        return (num < 10 ? '0' : '') + num;
    };

    const handleSelectedOption = (option) => {
        setSelectedOption(option);
    };

    const handleSeeExplanation = (option) => {
        setCheckSeeExplanation(checkSeeExplanation + 1);
    };

    const handleNextQuestion = () => {
        setNowQuestion(nowQuestion + 1);
        setCheckAnswer(2);
    };

    // ---------------------------------------------------------------------------
    // Hàm xử lý các câu hỏi bình thường
    const handleQuestion = (answer) => {
        let index = 0;
        index = Math.floor(Math.random() * 3);
        if (selectedOption !== '') {
            if (answer) {
                setCheckAnswer(1);
                setShowImgStatus(true);
                setImgNow(arr_image.true[index]);
                setPoint(point + 5);
            } else {
                setCheckAnswer(0);
                setShowImgStatus(false);
                setImgNow(arr_image.false[index]);
            }
        }
    };

    // -------------------------------------------------------------------------------------
    // Lấy giữ liệu theo idCS qua phương thức get
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
    // Nếu đang tải dữ liệu, hiển thị một phần giao diện loading
    if (loading) {
        return <div>Loading...</div>;
    }

    // -------------------------------------------------------------------------------------------------------
    // Gửi dữ liệu qua phương thức Post sang django
    const sendPoint = async () => {
        try {
            const data = { username: user.accountName, point: point };
            const response = await axios.put('http://127.0.0.1:8000/api/studentsAccount/', data);
            console.log(response.data); // Log response data if needed
            // Handle response data or perform additional actions
        } catch (error) {
            console.error('Error sending data to Django:', error);
            // Handle errors
        }
    };
    const handleEndQuestion = () => {
        sendPoint();
        navigate(`/courses/${course}/${subject}/summary/${point}/${formatTime}/${totalQuestionsDone}`);
    };

    // -----------------------------------------------------------------------------------------
    // Lấy icon khi chọn sai hay đúng kết quả
    const arr_image = {
        false: [image.iconEmoticon1, image.iconEmoticon3, image.iconEmoticon5],
        true: [image.iconEmoticon2, image.iconEmoticon4, image.iconEmoticon6],
    };

    return (
        <div className={cx('container-fluid  p-4', 'container-wrap-lam-bai-tap')}>
            <div className={cx('row container', 'wrap-content')}>
                <div className={cx('blinking-smile-icon', 'smile', { none: showImgStatus === null })}>
                    {showImgStatus ? (
                        <div>
                            <img src={imgNow} alt="iconEmoticon1" />
                            <img
                                className={cx('EmoticonContent')}
                                src={image.iconEmoticonContent1}
                                alt="iconEmoticonContent1"
                            />
                        </div>
                    ) : (
                        <div>
                            <img src={imgNow} alt="iconEmoticon2" />
                            <img
                                className={cx('EmoticonContent')}
                                src={image.iconEmoticonContent2}
                                alt="iconEmoticonContent1"
                            />
                        </div>
                    )}
                </div>
                <div className={cx('bg-white mb-4 rounded col-10', 'wrap-content-lam-bai-tap')}>
                    <div>
                        {questions &&
                            questions.questions &&
                            questions.questions.map(
                                (question) =>
                                    question.idQuestion === nowQuestion && (
                                        <>
                                            <div
                                                key={question.idQuestion}
                                                className={cx('d-flex justify-content-between pt-3')}
                                            >
                                                <span className={cx('span-nhan-biet')}>Câu {nowQuestion}</span>
                                                {question.levelOfDifficult === 'Nhận biết' && (
                                                    <div className={cx('div-nhan-biet', 'bg-primary')}>
                                                        {question.levelOfDifficult}
                                                    </div>
                                                )}
                                                {question.levelOfDifficult === 'Thông hiểu' && (
                                                    <div className={cx('div-nhan-biet', 'bg-success')}>
                                                        {question.levelOfDifficult}
                                                    </div>
                                                )}
                                                {question.levelOfDifficult === 'Vận dụng' && (
                                                    <div className={cx('div-nhan-biet', 'bg-warning')}>
                                                        {question.levelOfDifficult}
                                                    </div>
                                                )}
                                                {question.levelOfDifficult === 'Vận dụng cao' && (
                                                    <div className={cx('div-nhan-biet', 'bg-danger')}>
                                                        {question.levelOfDifficult}
                                                    </div>
                                                )}
                                            </div>
                                            <div className={cx('pt-2')}>
                                                <span className={cx('span-cau-hoi')}>{question.contentQuestion}</span>
                                            </div>
                                            <div className={cx('pt-3 pb-5')}>
                                                <div className={cx('row')}>
                                                    <div className={cx('col-6')}>
                                                        <span
                                                            className={cx('arround-select', {
                                                                active: selectedOption === 'A',
                                                            })}
                                                            onClick={() => handleSelectedOption('A')}
                                                        ></span>
                                                        A. {question.answerA}
                                                    </div>
                                                    <div className={cx('col-6')}>
                                                        <span
                                                            className={cx('arround-select', {
                                                                active: selectedOption === 'B',
                                                            })}
                                                            onClick={() => handleSelectedOption('B')}
                                                        ></span>
                                                        B. {question.answerB}
                                                    </div>
                                                    <div className={cx('col-6')}>
                                                        <span
                                                            className={cx('arround-select', {
                                                                active: selectedOption === 'C',
                                                            })}
                                                            onClick={() => handleSelectedOption('C')}
                                                        ></span>
                                                        C. {question.answerC}
                                                    </div>
                                                    <div className={cx('col-6')}>
                                                        <span
                                                            className={cx('arround-select', {
                                                                active: selectedOption === 'D',
                                                            })}
                                                            onClick={() => handleSelectedOption('D')}
                                                        ></span>
                                                        D. {question.answerD}
                                                    </div>
                                                </div>
                                            </div>
                                            {checkAnswer === 0 && (
                                                <div>
                                                    <div className={cx('wrap-content-option-wrong')}>
                                                        <FontAwesomeIcon icon={faXmark} className={cx('text-danger')} />
                                                        <span className={cx('text-danger', 'span-option-wrong')}>
                                                            Bạn đã chọn sai
                                                        </span>
                                                        <span
                                                            className={cx(
                                                                'text-success',
                                                                'span-option-wrong',
                                                                'span-option-wrong-2',
                                                            )}
                                                        >
                                                            Đáp án đúng: {question.correctAnswer}
                                                        </span>
                                                    </div>
                                                    <div className={cx('text-center')}>
                                                        <div
                                                            className={cx('pt-3 text-center', 'wrap-see-explanation')}
                                                            onClick={handleSeeExplanation}
                                                        >
                                                            <span className={cx('span-see-explanation')}>
                                                                Xem lời giải
                                                            </span>
                                                            {checkSeeExplanation % 2 === 0 ? (
                                                                <FontAwesomeIcon icon={faAnglesRight} />
                                                            ) : (
                                                                <FontAwesomeIcon icon={faAnglesDown} />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {checkSeeExplanation !== 0 && checkSeeExplanation % 2 !== 0 && (
                                                <div>
                                                    <div className={cx('wrap-explain')}>
                                                        <div className={cx('p-3 d-flex flex-column')}>
                                                            <span className={cx('title-explain')}>Lời giải:</span>
                                                            <span className={cx('content-explain')}>
                                                                {question.explanation.split('\n').map((content) => (
                                                                    <span className={cx('d-block')}>{content}</span>
                                                                ))}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            <div
                                                className={cx(
                                                    'd-flex justify-content-center pb-4 pt-4',
                                                    'wrap-suggest-and-next-question',
                                                )}
                                            >
                                                <div className={cx('wrap-button-suggest')}>
                                                    {checkAnswer === 2 ? (
                                                        <div>
                                                            <FontAwesomeIcon
                                                                icon={faLightbulb}
                                                                className={cx('icon-suggest')}
                                                            />
                                                            <span>Gợi ý</span>
                                                        </div>
                                                    ) : (
                                                        <span>
                                                            <Link
                                                                to={`/courses/${course}/${subject}/LyThuyet/${idCS}/${bai}`}
                                                            >
                                                                Xem lại lý thuyết
                                                            </Link>
                                                        </span>
                                                    )}
                                                </div>
                                                <div className={cx('wrap-button-next-and-watch')}>
                                                    {checkAnswer === 2 ? (
                                                        <div
                                                            className={cx('wrap-button-next-and-watch-in')}
                                                            onClick={() =>
                                                                handleQuestion(
                                                                    selectedOption === question.correctAnswer,
                                                                )
                                                            }
                                                        >
                                                            <div className={cx('wrap-button-watch-answer')}>
                                                                <span>Xem kết quả</span>
                                                                <FontAwesomeIcon
                                                                    icon={faAnglesRight}
                                                                    className={cx('icon-next-question')}
                                                                />
                                                            </div>
                                                        </div>
                                                    ) : nowQuestion === 3 ? (
                                                        <div
                                                            className={cx('wrap-button-next-and-watch-in')}
                                                            onClick={handleEndQuestion}
                                                        >
                                                            <div className={cx('wrap-button-watch-answer')}>
                                                                <span onClick={handleEndQuestion}>Tổng kết</span>
                                                                <FontAwesomeIcon
                                                                    icon={faAnglesRight}
                                                                    className={cx('icon-next-question')}
                                                                />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className={cx('wrap-button-next-and-watch-in')}
                                                            onClick={handleNextQuestion}
                                                        >
                                                            <div
                                                                className={cx('wrap-button-watch-answer')}
                                                                onClick={() => setCheckSeeExplanation(0)}
                                                            >
                                                                <span>Câu hỏi tiếp theo</span>
                                                                <FontAwesomeIcon
                                                                    icon={faAnglesRight}
                                                                    className={cx('icon-next-question')}
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className="d-none">
                                                        {(totalQuestionsDone = question.idQuestion)}
                                                    </div>
                                                </div>
                                            </div>

                                            <div
                                                className={cx('d-flex justify-content-between', 'wrap-infomation-icon')}
                                            >
                                                <div className={cx('d-flex')}>
                                                    <div>
                                                        <FontAwesomeIcon
                                                            icon={faFilePen}
                                                            className={cx('icon-next-answered')}
                                                        />
                                                        4723 lượt trả lời
                                                    </div>
                                                    <div>
                                                        <FontAwesomeIcon
                                                            icon={faXmark}
                                                            className={cx('icon-next-wrong-answered')}
                                                        />
                                                        12% trả lời sai
                                                    </div>
                                                </div>
                                                <div className={cx('d-flex')}>
                                                    <div>
                                                        <FontAwesomeIcon
                                                            icon={faDownload}
                                                            className={cx('icon-next-save')}
                                                        />
                                                        Lưu bài
                                                    </div>
                                                    <div>
                                                        <FontAwesomeIcon
                                                            icon={faPenToSquare}
                                                            className={cx('icon-next-note')}
                                                        />
                                                        Note
                                                    </div>
                                                    <div>
                                                        <FontAwesomeIcon
                                                            icon={faCircleExclamation}
                                                            className={cx('icon-next-error')}
                                                        />
                                                        Báo lỗi
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ),
                            )}
                    </div>
                </div>
                <div className={cx('col-2', 'wrap-point')}>
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
                            <span className={cx('h-100 text-center p-3')}>{formatTime}</span>
                        </div>
                    </div>
                    <div>
                        <div className={cx('wrap-zone-point', 'mt-3')}>
                            <span className={cx('h-100 p-1 text-center', 'content-point-answered')}>Số câu đã làm</span>
                            <span className={cx('h-100 text-center p-3')}>{totalQuestionsDone}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DoExercise;
