import style from './TracNghiem.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '~/context/authcontext';

const cx = classNames.bind(style);

function TracNghiem() {
    const [contentSubjectAndTitleSubjects, setContentSubjectAndTitleSubjects] = useState([]);
    const [contentSubjectList, setContentSubjectList] = useState([]);
    const [accounts, setAccount] = useState([]);
    const { subject, course } = useParams();
    const { user } = useContext(AuthContext);
    let totalContent = 0;
    let totalTitle = 0;
    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/titleContentList/?nameSubject=${subject}`)
            .then((res) => {
                setContentSubjectAndTitleSubjects(res.data);
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

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/studentsAccount/')
            .then((res) => {
                setAccount(res.data);
            })
            .catch(() => {});

        const intervalId = setInterval(function () {
            axios
                .get('http://localhost:8000/api/studentsAccount/')
                .then((res) => {
                    setAccount(res.data);
                })
                .catch(() => {});
        }, 300000);
        // Đảm bảo dừng vòng lặp khi component unmounts hoặc khi useEffect được gọi lại
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <div className={cx('container')}>
                <h5 className={cx('pt-4')}>Luyện BTTN môn {subject}</h5>
            </div>
            <div className={cx('d-flex row container align-center', 'container-wrap')}>
                <div className={cx('col-8 row')}>
                    <div className={cx('d-none')}>{(totalTitle = 0)}</div>
                    {contentSubjectAndTitleSubjects &&
                        contentSubjectAndTitleSubjects.title_contents &&
                        contentSubjectAndTitleSubjects.title_contents.map((title_content) => (
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
                                                (content_subject) =>
                                                    content_subject.idTitleContent === title_content.idTitleContent &&
                                                    ((totalContent += 1),
                                                    (
                                                        <Link
                                                            to={`/courses/${course}/${subject}/TracNghiem/${content_subject.idContentSubject}/${totalContent}`}
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
                <div className={cx('col-4')}>
                    <div>
                        <div className={cx('bg-white mb-4 rounded', 'wrap-ranking')}>
                            <div className={cx('d-flex rounded', 'wrap-icon-title-ranking')}>
                                <img className={cx('img-ranking')} src={images.icon_ranking} alt="icon-ranking" />
                                <span className={cx('title-ranking')}>Bảng xếp hạng môn: {subject}</span>
                            </div>
                            {accounts.map((account, key) => (
                                <div key={key}>
                                    <div className={cx('d-flex justify-content-center align-items-center pb-4')}>
                                        <div className={cx('item-rank')}>
                                            <div class={cx('icon-avata')}>
                                                <img src={images.download} alt="avata" />
                                                <span class={cx('rank-user')}>{key + 1}</span>
                                            </div>
                                        </div>
                                        <div
                                            className={cx(
                                                'flex-grow-1 d-flex justify-content-center text-center align-items-center',
                                                'name-user',
                                            )}
                                        >
                                            <span className={cx(' text-dark')}>{account.name}</span>
                                        </div>
                                        <div className={cx('point', ' flex-grow-1')}>
                                            <span>{account.point}</span>
                                            <img src={images.logo} alt="logo" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {accounts.map(
                                (account, key) =>
                                    user &&
                                    account.idAccount === user.idAccount && (
                                        <div
                                            className={cx(
                                                'd-flex justify-content-center align-items-center pb-4',
                                                'my-rank',
                                            )}
                                        >
                                            <div className={cx('item-rank')}>
                                                <div class={cx('icon-avata')}>
                                                    <img src={images.download} alt="avata" />
                                                    <span class={cx('rank-user')}>{key + 1}</span>
                                                </div>
                                            </div>
                                            <div
                                                className={cx(
                                                    'flex-grow-1 d-flex justify-content-center text-center align-items-center',
                                                    'name-user',
                                                )}
                                            >
                                                <span className={cx(' text-dark')}>{user.name}</span>
                                            </div>
                                            <div className={cx('point', ' flex-grow-1')}>
                                                <span>{user.point}</span>
                                                <img src={images.logo} alt="logo" />
                                            </div>
                                        </div>
                                    ),
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TracNghiem;
