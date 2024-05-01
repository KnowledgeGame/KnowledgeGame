import React, { useContext } from 'react';
import Header from './Header/Header';
import { useParams } from 'react-router-dom';
import {
    Contents,
    Courses,
    Home,
    Questions,
    Titles,
    Teachers,
    Students,
    Statistics,
    TranSactionStudents,
    TranSactionTeachers,
    Subjects,
    NotFound,
} from './pagesAdmin/Pages';
import SideNav from './SideNav/SideNav';
import { AuthContext } from '~/context/authcontext';

function AdminPage() {
    var { option } = useParams();

    const position = sessionStorage.getItem('position');
   
    return (
        <div>
            <Header />
            {option && position === 'Teacher' ? (
                option === 'home' ? (
                    <Home />
                ) : option === 'subjects' ? (
                    <Subjects />
                ) : option === 'questions' ? (
                    <Questions />
                ) : option === 'titleContents' ? (
                    <Titles />
                ) : option === 'contentSubjects' ? (
                    <Contents />
                ) : (
                    <NotFound />
                )
            ) : option === 'home' ? (
                <Home />
            ) : option === 'courses' ? (
                <Courses />
            ) : option === 'questions' ? (
                <Questions />
            ) : option === 'titleContents' ? (
                <Titles />
            ) : option === 'contentSubjects' ? (
                <Contents />
            ) : option === 'students' ? (
                <Students />
            ) : option === 'teachers' ? (
                <Teachers />
            ) : option === 'statistics' ? (
                <Statistics />
            ) : option === 'transactionStudents' ? (
                <TranSactionStudents />
            ) : option === 'transactionTeachers' ? (
                <TranSactionTeachers />
            ) : option === 'subjects' ? (
                <Subjects />
            ) : (
                <NotFound />
            )}

            <SideNav />
        </div>
    );
}

export default AdminPage;
