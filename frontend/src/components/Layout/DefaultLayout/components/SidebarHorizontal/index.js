import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import style from './SidebarHorizontal.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(style);

function SidebarHorizontal() {
    const [subjects, setSubjects] = useState([]);
    const [course, setCourse] = useState([]);

    const { subject, type } = useParams();

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/subject/')
            .then((res) => {
                setSubjects(res.data);
            })
            .catch((error) => {
                console.error('Error fetching subjects:', error);
            });
    }, []);

    useEffect(() => {
        if (subjects.length > 0) {
            const foundSubject = subjects.find((item) => item.nameSubject === subject);
            if (foundSubject) {
                axios
                    .get(`http://127.0.0.1:8000/api/course/?idCourse=${foundSubject.idCourse}`)
                    .then((res) => {
                        setCourse(res.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching courses:', error);
                    });
            }
        }
    }, [subjects, subject]);

    const objSubject = {
        Python: images.logoPython,
        Javascript: images.logoJS,
        HTML: images.logoHTML,
        CSS: images.logoCSS,
        'Data Analyst': images.logoDA,
        'Computer Vision': images.logoCV,
    };

    return (
        <div className={cx('d-flex justify-content-center', 'container-menu-subject')}>
            {subjects.map((subjectItem) => (
                <div className={cx('container-subject')} key={subjectItem.idSubject}>
                    <NavLink
                        className={(nav) =>
                            cx('container-fluid d-flex justify-content-between align-items-center', 'sidebar', {
                                active: nav.isActive,
                            })
                        }
                        to={`/courses/${course.length > 0 ? course[0].nameCourse : ''}/${
                            subjectItem.nameSubject
                        }/${type}`}
                    >
                        <img className={cx('logoSubject')} src={objSubject[subjectItem.nameSubject]} alt="logo" />
                        <span className={cx('span-sidebar')}>{subjectItem.nameSubject}</span>
                    </NavLink>
                </div>
            ))}
        </div>
    );
}

export default SidebarHorizontal;
