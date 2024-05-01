import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './Questions.module.scss';
import { faClose, faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
const cx = classNames.bind(style);
function Questions() {
    const [questions, setQuestions] = useState([]);
    const [idUpdate, setIdUpdate] = useState(0);
    const [stateForm, setStateForm] = useState(0);
    const [stateAddForm, setStateAddForm] = useState(0);

    const [formData, setFormData] = useState({
        idQuestion: '',
        idContentSubject: '',
        contentQuestion: '',
        levelOfDifficult: '',
        answerA: '',
        answerB: '',
        answerC: '',
        answerD: '',
        correctAnswer: '',
        explanation: '',
    });
    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/questionsSubjectAll/')
            .then((res) => {
                setQuestions(res.data);
            })
            .catch((error) => {
                console.error('Lỗi', error);
            });
    }, []);
    const callAPI = () => {
        axios
            .get('http://127.0.0.1:8000/api/questionsSubjectAll/')
            .then((res) => {
                setQuestions(res.data);
            })
            .catch((error) => {
                console.error('Lỗi', error);
            });
    };

    const handelDelete = async (id) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa trường dữ liệu ${id} không?`)) {
            axios
                .delete(`http://localhost:8000/api/questionsSubjectAll/delete/${id}/`)
                .then((response) => {
                    console.log(response.data); // Log thông báo xóa thành công hoặc thông tin khác từ phản hồi của API
                    // Thực hiện các hành động khác sau khi xóa thành công (nếu cần)
                    callAPI();
                })
                .catch((error) => {
                    console.error('Error deleting course:', error); // Log lỗi nếu có
                    // Thực hiện xử lý lỗi hoặc hiển thị thông báo lỗi cho người dùng (nếu cần)
                });
        }
    };

    // Hàm xử lý khi một trường dữ liệu thay đổi
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Hàm xử lý khi form được gửi đi
    const handleUpdate = async (e) => {
        if (window.confirm(`Bạn có chắc chắn muốn sửa trường dữ liệu ${formData.idQuestion} không?`)) {
            await axios.put('http://127.0.0.1:8000/api/questionsSubjectAll/', formData);
        } else {
            e.preventDefault();
        }
    };

    // Set up form
    const handleSetUpForm = (id) => {
        setStateForm(1);
        setIdUpdate(id);
        setFormData({ ...formData, idQuestion: id });
    };

    // add data
    const handleAdd = async (e) => {
        window.alert('Thêm thành công!');
        await axios.post('http://127.0.0.1:8000/api/questionsSubjectAll/', formData);
    };
    return (
        <div>
            {/* Content Wrapper. Contains page content */}
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>DataTables</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <a href="#">Home</a>
                                    </li>
                                    <li className="breadcrumb-item active">DataTables</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    {/* /.container-fluid */}
                </section>
                {/* Main content */}
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className={cx('card-header', 'row')}>
                                        <h3 className="card-title col-11">Questions Table</h3>
                                        <button
                                            type="button"
                                            className={cx('btn btn-success', 'col-1')}
                                            onClick={() => setStateAddForm(1)}
                                        >
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                    </div>
                                    {/* /.card-header */}
                                    <div className="card-body">
                                        <table id="example2" className="table table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th>STT</th>
                                                    <th>ContentQuestion</th>
                                                    <th>LevelOfDifficult</th>
                                                    <th>answerA</th>
                                                    <th>answerB</th>
                                                    <th>answerC</th>
                                                    <th>answerD</th>
                                                    <th>correctAnswer</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {questions &&
                                                    questions.questions &&
                                                    questions.questions.map((question, index) => (
                                                        <tr>
                                                            <td>{index + 1}</td>
                                                            <td>{question.contentQuestion}</td>
                                                            <td>{question.levelOfDifficult}</td>
                                                            <td>{question.answerA}</td>
                                                            <td>{question.answerB}</td>
                                                            <td>{question.answerC}</td>
                                                            <td>{question.answerD}</td>
                                                            <td>{question.correctAnswer}</td>
                                                            <td className="d-flex justify-content-center align-items-center">
                                                                <button
                                                                    type="button"
                                                                    class="btn btn-info"
                                                                    onClick={() => handleSetUpForm(question.idQuestion)}
                                                                >
                                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                                </button>

                                                                <button
                                                                    type="button"
                                                                    class="btn btn-danger ml-1"
                                                                    onClick={() => handelDelete(question.idQuestion)}
                                                                >
                                                                    <FontAwesomeIcon icon={faTrash} />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                        {/* Form */}
                                        {questions.questions &&
                                            questions.questions.map(
                                                (question) =>
                                                    question.idQuestion === idUpdate && (
                                                        <div
                                                            className={cx('wrap', { 'display-none': stateForm === 0 })}
                                                        >
                                                            <div className={cx('wrap-update')}>
                                                                <div className="d-flex justify-content-end w-100">
                                                                    <FontAwesomeIcon
                                                                        icon={faClose}
                                                                        className={cx('cusor-pointer')}
                                                                        onClick={() => setStateForm(0)}
                                                                    />
                                                                </div>
                                                                <h2 className="text-center">Question Form</h2>
                                                                <form
                                                                    onSubmit={handleUpdate}
                                                                    className={cx('form-wrap')}
                                                                >
                                                                    <div>
                                                                        <label htmlFor="idContentSubject">
                                                                            ID Content Subject
                                                                        </label>
                                                                        <input
                                                                            type="number"
                                                                            id="idContentSubject"
                                                                            name="idContentSubject"
                                                                            defaultValue={question.idContentSubject}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label htmlFor="contentQuestion">
                                                                            Content Question
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            id="contentQuestion"
                                                                            name="contentQuestion"
                                                                            defaultValue={question.contentQuestion}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label htmlFor="levelOfDifficult">
                                                                            Level Of Difficult
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            id="levelOfDifficult"
                                                                            name="levelOfDifficult"
                                                                            defaultValue={question.levelOfDifficult}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label htmlFor="answerA">Answer A</label>
                                                                        <input
                                                                            type="text"
                                                                            id="answerA"
                                                                            name="answerA"
                                                                            defaultValue={question.answerA}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label htmlFor="answerB">Answer B</label>
                                                                        <input
                                                                            type="text"
                                                                            id="answerB"
                                                                            name="answerB"
                                                                            defaultValue={question.answerB}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label htmlFor="answerC">Answer C</label>
                                                                        <input
                                                                            type="text"
                                                                            id="answerC"
                                                                            name="answerC"
                                                                            defaultValue={question.answerC}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label htmlFor="answerD">Answer D</label>
                                                                        <input
                                                                            type="answerD"
                                                                            id="answerD"
                                                                            name="answerD"
                                                                            defaultValue={question.answerD}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label htmlFor="correctAnswer">
                                                                            Correct Answer
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            id="correctAnswer"
                                                                            name="correctAnswer"
                                                                            defaultValue={question.correctAnswer.replace(
                                                                                'Z',
                                                                                '',
                                                                            )}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label htmlFor="explanation">Explanation</label>
                                                                        <input
                                                                            type="text"
                                                                            id="explanation"
                                                                            name="explanation"
                                                                            defaultValue={question.explanation}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>

                                                                    <button type="submit">Submit</button>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    ),
                                            )}

                                        {/* Form add */}

                                        {stateAddForm !== 0 && (
                                            <div className={cx('wrap', { 'display-none': stateAddForm === 0 })}>
                                                <div className={cx('wrap-update')}>
                                                    <div className="d-flex justify-content-end w-100">
                                                        <FontAwesomeIcon
                                                            icon={faClose}
                                                            className={cx('cusor-pointer')}
                                                            onClick={() => setStateAddForm(0)}
                                                        />
                                                    </div>
                                                    <h2 className="text-center">Question Form</h2>
                                                    <form onSubmit={handleAdd} className={cx('form-wrap')}>
                                                        <div>
                                                            <label htmlFor="idContentSubject">ID Content Subject</label>
                                                            <input
                                                                type="number"
                                                                id="idContentSubject"
                                                                name="idContentSubject"
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="contentQuestion">Content Question</label>
                                                            <input
                                                                type="text"
                                                                id="contentQuestion"
                                                                name="contentQuestion"
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="levelOfDifficult">Level Of Difficult</label>
                                                            <input
                                                                type="text"
                                                                id="levelOfDifficult"
                                                                name="levelOfDifficult"
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="answerA">Answer A</label>
                                                            <input
                                                                type="text"
                                                                id="answerA"
                                                                name="answerA"
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="answerB">Answer B</label>
                                                            <input
                                                                type="text"
                                                                id="answerB"
                                                                name="answerB"
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="answerC">Answer C</label>
                                                            <input
                                                                type="text"
                                                                id="answerC"
                                                                name="answerC"
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="answerD">Answer D</label>
                                                            <input
                                                                type="answerD"
                                                                id="answerD"
                                                                name="answerD"
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="correctAnswer">Correct Answer</label>
                                                            <input
                                                                type="text"
                                                                id="correctAnswer"
                                                                name="correctAnswer"
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="explanation">Explanation</label>
                                                            <input
                                                                type="text"
                                                                id="explanation"
                                                                name="explanation"
                                                                onChange={handleChange}
                                                            />
                                                        </div>

                                                        <button type="submit">Submit</button>
                                                    </form>
                                                </div>
                                            </div>
                                        )}

                                        <nav aria-label="Page navigation example">
                                            <ul className="pagination pt-2">
                                                <li className="page-item">
                                                    <a className="page-link" href="#">
                                                        Previous
                                                    </a>
                                                </li>
                                                <li className="page-item">
                                                    <a className="page-link" href="#">
                                                        1
                                                    </a>
                                                </li>
                                                <li className="page-item">
                                                    <a className="page-link" href="#">
                                                        2
                                                    </a>
                                                </li>
                                                <li className="page-item">
                                                    <a className="page-link" href="#">
                                                        3
                                                    </a>
                                                </li>
                                                <li className="page-item">
                                                    <a className="page-link" href="#">
                                                        Next
                                                    </a>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                    {/* /.card-body */}
                                </div>
                                {/* /.card */}
                            </div>
                            {/* /.col */}
                        </div>
                        {/* /.row */}
                    </div>
                    {/* /.container-fluid */}
                </section>
                {/* /.content */}
            </div>
        </div>
    );
}

export default Questions;
