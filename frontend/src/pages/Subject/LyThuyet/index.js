import style from './LyThuyet.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const cx = classNames.bind(style);

function LyThuyet() {
    const [contentSubjectAndTitleSubjects, setContentSubjectAndTitleSubjects] = useState({});
    const { subject } = useParams();
    const { course } = useParams();
    const { idCS } = useParams();
    const { bai } = useParams();

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/contentSubjectAndTitleSubject/')
            .then((res) => {
                setContentSubjectAndTitleSubjects(res.data);
            })
            .catch(() => {});
    }, []);
    return (
        <div className={cx('d-flex row container align-center w-100', 'container-wrap-ly-thuyet')}>
            <div className={cx('bg-white mb-4 rounded w-100')}>
                {contentSubjectAndTitleSubjects &&
                    contentSubjectAndTitleSubjects.content_subjects &&
                    contentSubjectAndTitleSubjects.content_subjects.map(
                        (content_subject) =>
                            content_subject.idContentSubject === parseInt(idCS) && (
                                <span className={cx('title-ly-thuyet', 'text-center')}>
                                    Bài {bai}: {content_subject.nameContent}
                                </span>
                            ),
                    )}
                <div class={cx('wrap-link-bai-tap', 'pb-3')}>
                    <div>
                        <Link
                            className={cx('link-bai-tap')}
                            to={`/courses/${course}/${subject}/TracNghiem/${idCS}/${bai}`}
                        >
                            Bài tập vận dụng
                        </Link>
                    </div>
                </div>
                <div className={cx('d-flex flex-column w-100')}>
                    {contentSubjectAndTitleSubjects &&
                        contentSubjectAndTitleSubjects.content_subjects &&
                        contentSubjectAndTitleSubjects.content_subjects
                            .filter((content_subject) => content_subject.idContentSubject === parseInt(idCS))
                            .map((content_subject) =>
                                content_subject.contentSubject.split('\n').map((content) => <span>{content}</span>),
                            )}
                </div>
                <div class={cx('wrap-link-bai-tap-end', 'p-4')}>
                    <div>
                        <Link
                            className={cx('link-bai-tap-end')}
                            to={`/courses/${course}/${subject}/TracNghiem/${idCS}/${bai}`}
                        >
                            Bài tập vận dụng
                            <FontAwesomeIcon className={cx('icon-link-bai-tap')} icon={faAnglesRight} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LyThuyet;
