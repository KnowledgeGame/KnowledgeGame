import axios from 'axios';
import style from './MenuLyThuyet.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const cx = classNames.bind(style);
function TracNghiem() {
    const [contentTitleContentList, setContentTitleContentList] = useState([]);
    const [contentSubjectList, setContentSubjectList] = useState([]);
    const { subject, course } = useParams();
    let totalContent = 0;
    let totalTitle = 0;
    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/titleContentList/?nameSubject=${subject}`)
            .then((res) => {
                setContentTitleContentList(res.data);
            })
            .catch(() => {});
    }, [subject]);
    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/contentSubjectList/?nameSubject=${subject}`)
            .then((res) => {
                setContentSubjectList(res.data);
            })
            .catch(() => {});
    }, [subject]);
    return (
        <div>
            <div className={cx('container')}>
                <h5 className={cx('pt-4')}>Ôn lý thuyết môn {subject}</h5>
            </div>
            <div className={cx('d-flex row container align-center', 'container-wrap')}>
                <div className={cx('d-none')}>{(totalTitle = 0)}</div>
                {contentTitleContentList &&
                    contentTitleContentList.title_contents &&
                    contentTitleContentList.title_contents.map((title_content) => (
                        <div className={cx('col-4 ')}>
                            <div className={cx('bg-white mb-4 rounded')}>
                                <div className={cx('d-none')}>{(totalTitle += 1)}</div>
                                <span className={cx('title-trac-nghiem')}>
                                    Phần {totalTitle}: {title_content.titleContent}
                                </span>
                                <div className={cx('d-flex flex-column')}>
                                    <div className={cx('d-none')}>{(totalContent = 0)}</div>
                                    {contentSubjectList &&
                                        contentSubjectList.content_subjects &&
                                        contentSubjectList.content_subjects.map(
                                            (content_subject, index) =>
                                                content_subject.idTitleContent === title_content.idTitleContent &&
                                                ((totalContent += 1),
                                                (
                                                    <Link
                                                        to={`/courses/${course}/${subject}/LyThuyet/${content_subject.idContentSubject}/${totalContent}`}
                                                        className={cx('title-trac-nghiem-a')}
                                                    >
                                                        {totalContent}. {content_subject.nameContent}
                                                    </Link>
                                                )),
                                        )}
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default TracNghiem;
