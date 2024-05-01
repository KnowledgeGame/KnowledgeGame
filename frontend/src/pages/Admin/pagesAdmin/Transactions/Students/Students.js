import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';
import { faClose, faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import style from './Students.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const cx = classNames.bind(style);
function Students() {
    const [students, setStudents] = useState([]);
    const [studentsInformation, setStudentsInformation] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState([]);
    const [stateAddForm, setStateAddForm] = useState(0);
    const [stateForm, setStateForm] = useState(0);
    const [idUpdate, setIdUpdate] = useState(0);
    const [formData, setFormData] = useState({
        idTransactionHistory: '',
        idAccount: '',
        position: '',
        content: '',
        price: '',
        time: '',
    });

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/statisticStudents/')
            .then((res) => {
                setStudents(res.data);
            })
            .catch((error) => {
                console.error('Lỗi', error);
            });
    }, []);

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/studentAPIViewByExpiry/')
            .then((res) => {
                setStudentsInformation(res.data);
            })
            .catch((error) => {
                console.error('Lỗi', error);
            });
    }, []);

    const callAPI = () => {
        axios
            .get('http://127.0.0.1:8000/api/statisticStudents/')
            .then((res) => {
                setStudents(res.data);
            })
            .catch((error) => {
                console.error('Lỗi', error);
            });
    };

    const handelDelete = async (id) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa trường dữ liệu ${id} không?`)) {
            axios
                .delete(`http://localhost:8000/api/statisticStudents/delete/${id}/`)
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
        if (window.confirm(`Bạn có chắc chắn muốn sửa trường dữ liệu ${formData.idTransactionHistory} không?`)) {
            await axios.put('http://127.0.0.1:8000/api/statisticStudents/', formData);
        } else {
            e.preventDefault();
        }
    };

    // Set up form
    const handleSetUpForm = (id) => {
        setStateForm(1);
        setIdUpdate(id);
        setFormData({ ...formData, idTransactionHistory: id });
    };

    // Set value for combobox
    const handleCombobox = (e) => {
        setSelectedStudent(e.target.value);
        setFormData({
            ...formData,
            idAccount: e.target.value,
        });
    };

    // open add form
    const openAddForm = () => {
        setStateAddForm(1);
        setFormData({ ...formData, position: 'Student' });
    };

    const handleAdd = async (e) => {
        window.alert('Thêm thành công!');

        await axios.post('http://127.0.0.1:8000/api/statisticTeachers/', formData);
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
                                        <h3 className="card-title col-11">Transaction Students Table</h3>
                                        <button
                                            type="button"
                                            className={cx('btn btn-success', 'col-1')}
                                            onClick={openAddForm}
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
                                                    <th>idTransactionHistory</th>
                                                    <th>idTransactionHistory</th>
                                                    <th>Content</th>
                                                    <th>Price</th>
                                                    <th>Time</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {students &&
                                                    students.map((student, index) => (
                                                        <tr>
                                                            <td>{index + 1}</td>
                                                            <td>{student.idTransactionHistory}</td>
                                                            <td>{student.idTransactionHistory}</td>
                                                            <td>{student.content}</td>
                                                            <td>{student.price}</td>
                                                            <td>{student.time}</td>

                                                            <td className="d-flex justify-content-center align-items-center">
                                                                <button
                                                                    type="button"
                                                                    class="btn btn-info"
                                                                    onClick={() =>
                                                                        handleSetUpForm(student.idTransactionHistory)
                                                                    }
                                                                >
                                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                                </button>

                                                                <button
                                                                    type="button"
                                                                    class="btn btn-danger ml-1"
                                                                    onClick={() =>
                                                                        handelDelete(student.idTransactionHistory)
                                                                    }
                                                                >
                                                                    <FontAwesomeIcon icon={faTrash} />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                        {/* Form */}
                                        {students &&
                                            students.map(
                                                (student) =>
                                                    student.idTransactionHistory === idUpdate && (
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
                                                                <h2 className="text-center">Student Form</h2>
                                                                <form
                                                                    onSubmit={handleUpdate}
                                                                    className={cx('form-wrap')}
                                                                >
                                                                    <div>
                                                                        <label htmlFor="idAccount">ID Account</label>
                                                                        <input
                                                                            type="number"
                                                                            id="idAccount"
                                                                            name="idAccount"
                                                                            defaultValue={student.idAccount}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>

                                                                    <div>
                                                                        <label htmlFor="position">Position</label>
                                                                        <input
                                                                            type="text"
                                                                            id="position"
                                                                            name="position"
                                                                            defaultValue={student.position}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label htmlFor="content">Content</label>
                                                                        <input
                                                                            type="text"
                                                                            id="content"
                                                                            name="content"
                                                                            defaultValue={student.content}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label htmlFor="price">Price</label>
                                                                        <input
                                                                            type="price"
                                                                            id="price"
                                                                            name="price"
                                                                            defaultValue={student.price}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label htmlFor="time">Time</label>
                                                                        <input
                                                                            type="datetime-local"
                                                                            id="time"
                                                                            name="time"
                                                                            defaultValue={student.time.replace('Z', '')}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>

                                                                    <button  type="submit">
                                                                        Submit
                                                                    </button>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    ),
                                            )}

                                        {/* Add Form */}
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
                                                    <h2 className="text-center">Student Form</h2>
                                                    <form onSubmit={handleAdd} className={cx('form-wrap')}>
                                                        <div>
                                                            <label htmlFor="idAccount">ID Account</label>
                                                            <select
                                                                id="teacher"
                                                                value={selectedStudent}
                                                                onChange={handleCombobox}
                                                            >
                                                                <option> ----- Choose Student -----</option>
                                                                {studentsInformation &&
                                                                    studentsInformation.map((student) => (
                                                                        <option
                                                                            key={student.idAccount}
                                                                            value={student.idAccount}
                                                                        >
                                                                            {student.idAccount}
                                                                        </option>
                                                                    ))}
                                                            </select>
                                                        </div>

                                                        <div>
                                                            <label htmlFor="position">Position</label>
                                                            <input
                                                                type="text"
                                                                id="position"
                                                                name="position"
                                                                defaultValue="Student"
                                                                disabled="true"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="content">Content</label>
                                                            <input
                                                                type="text"
                                                                id="content"
                                                                name="content"
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="price">Price</label>
                                                            <input
                                                                type="price"
                                                                id="price"
                                                                name="price"
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="time">Time</label>
                                                            <input
                                                                type="datetime-local"
                                                                id="time"
                                                                name="time"
                                                                onChange={handleChange}
                                                            />
                                                        </div>

                                                        <button  type="submit">
                                                            Submit
                                                        </button>
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

export default Students;
