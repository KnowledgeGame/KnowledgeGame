import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import style from './Sidebar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(style);

function Sidebar() {
    const [subjects, setSubjects] = useState([]);
    const { course } = useParams();
    var idCourse = 1;
    var nameCourse = '';
    switch (course) {
        case 'BackEnd':
            idCourse = 1;
            nameCourse = 'BackEnd';
            break;
        case 'FrontEnd':
            idCourse = 2;
            nameCourse = 'FrontEnd';
            break;
        case 'AI':
            idCourse = 3;
            nameCourse = 'AI';
            break;
        default:
            console.log('Default action');
    }
    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/subject/')
            .then((res) => {
                setSubjects(res.data);
            })
            .catch(() => {});
    }, []);
    return (
        <div>
            {subjects.map((subject) => (
                <>
                    {subject.idCourse === idCourse ? (
                        <div key={subject.idSubject}>
                            <NavLink
                                className={(nav) =>
                                    cx(
                                        'container-fluid mt-2 d-flex justify-content-between align-items-center',
                                        'sidebar',
                                        { active: nav.isActive },
                                    )
                                }
                                to={`/courses/${nameCourse}/${subject.nameSubject}`}
                            >
                                <span className={cx('span-sidebar')}>{subject.nameSubject}</span>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </NavLink>
                        </div>
                    ) : null}
                </>
            ))}
        </div>
    );
}

export default Sidebar;
