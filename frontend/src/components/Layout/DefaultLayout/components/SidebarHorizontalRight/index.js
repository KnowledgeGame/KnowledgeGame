import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import style from './SidebarHorizontalRight.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(style);

function SidebarHorizontalRight() {
    const [contentTitleContentList, setContentTitleContentList] = useState([]);

    const [contentSubjectList, setContentSubjectList] = useState([]);

    const [isHidden, setIsHidden] = useState(Array(7).fill(false));
    const { course, subject } = useParams();
    // let total = 0;
    const handleToggle = (index) => {
        const newIsHidden = [...isHidden];
        newIsHidden[index - 1] = !newIsHidden[index - 1];
        setIsHidden(newIsHidden);
    };

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
    // useEffect(() => {
    //     axios
    //         .get('http://127.0.0.1:8000/api/contentSubjectAndTitleSubject/')
    //         .then((res) => {
    //             setContentSubjectAndTitleSubjects(res.data);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching subjects:', error);
    //         });
    // }, []);

    return (
        <div className={cx('d-flex justify-content-center flex-column', 'container-menu-subject-ly-thuyet')}>
            <div className={cx('d-none')}>{(totalTitle = 0)}</div>
            {contentTitleContentList &&
                contentTitleContentList.title_contents &&
                contentTitleContentList.title_contents.map((title_content) => (
                    <div key={title_content.idContentSubject}>
                        <div
                            className={cx('container-subject-ly-thuyet', 'mb-1')}
                            onClick={() => handleToggle(title_content.idTitleContent)}
                        >
                            <div className={cx('d-flex w-100 p-2')}>
                                <div className={cx('d-none')}>{(totalTitle += 1)}</div>
                                <span className={cx('span-sidebar')}>
                                    CHƯƠNG {totalTitle}: {title_content.titleContent}
                                </span>
                                <span>
                                    <FontAwesomeIcon icon={faCircleChevronRight} />
                                </span>
                            </div>
                        </div>
                        <div className={cx('d-none')}>{(totalContent = 0)}</div>
                        {isHidden[title_content.idTitleContent - 1] && (
                            <div className={cx('wrap-menu-ly-thuyet', 'container')}>
                                {contentSubjectList &&
                                    contentSubjectList.content_subjects &&
                                    contentSubjectList.content_subjects.map(
                                        (content_subject) =>
                                            content_subject.idTitleContent === title_content.idTitleContent && (
                                                <div>
                                                    <div className={cx('d-none')}>{(totalContent += 1)}</div>
                                                    <NavLink
                                                        className={cx('abc')}
                                                        to={`/courses/${course}/${subject}/LyThuyet/${content_subject.idContentSubject}/${totalContent}`}
                                                        alt="..."
                                                    >
                                                        {totalContent}. {content_subject.nameContent}
                                                    </NavLink>
                                                </div>
                                            ),
                                    )}
                            </div>
                        )}
                    </div>
                ))}
        </div>
    );
}

export default SidebarHorizontalRight;
