import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';
import { faClose, faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import style from './Contents.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const cx = classNames.bind(style);
function Contents() {
    const [contents, setContents] = useState([]);
    const [stateForm, setStateForm] = useState(0);
    const [stateAddForm, setStateAddForm] = useState(0);
    const [idUpdate, setIdUpdate] = useState(0);
    const [formData, setFormData] = useState({
        idContentSubject: '',
        idTitleContent: '',
        idSubject: '',
        nameContent: '',
        contentSubject: '',
    });
    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/contentSubjectsAll/')
            .then((res) => {
                setContents(res.data);
            })
            .catch((error) => {
                console.error('Lỗi', error);
            });
    }, []);
    const callAPI = () => {
        axios
            .get('http://127.0.0.1:8000/api/contentSubjectsAll/')
            .then((res) => {
                setContents(res.data);
            })
            .catch((error) => {
                console.error('Lỗi', error);
            });
    };

    const handelDelete = async (id) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa trường dữ liệu ${id} không?`)) {
            axios
                .delete(`http://localhost:8000/api/contentSubjectsAll/delete/${id}/`)
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
        if (window.confirm(`Bạn có chắc chắn muốn sửa trường dữ liệu ${formData.idContentSubject} không?`)) {
            await axios.put('http://127.0.0.1:8000/api/contentSubjectsAll/', formData);
        } else {
            e.preventDefault();
        }
    };

    // Set up form
    const handleSetUpForm = (id) => {
        setStateForm(1);
        setIdUpdate(id);
        setFormData({ ...formData, idContentSubject: id });
    };

    // add data
    const handleAdd = async (e) => {
        window.alert('Thêm thành công!');
        await axios.post('http://127.0.0.1:8000/api/contentSubjectsAll/', formData);
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
                                        <h3 className="card-title col-11">Theorys Table</h3>
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
                                                    <th>NameContent</th>
                                                    <th>ContentSubject</th>
                                                    <th>IdTitleContent</th>
                                                    <th>IdSubject</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {contents &&
                                                    contents.contents_subject &&
                                                    contents.contents_subject.map((title, index) => (
                                                        <tr>
                                                            <td>{index + 1}</td>
                                                            <td>{title.nameContent}</td>
                                                            <td>{title.contentSubject}</td>
                                                            <td>{title.idTitleContent}</td>
                                                            <td>{title.idSubject}</td>
                                                            <td className="d-flex justify-content-center align-items-center">
                                                                <button
                                                                    type="button"
                                                                    class="btn btn-info"
                                                                    onClick={() =>
                                                                        handleSetUpForm(title.idContentSubject)
                                                                    }
                                                                >
                                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                                </button>

                                                                <button
                                                                    type="button"
                                                                    class="btn btn-danger ml-1"
                                                                    onClick={() => handelDelete(title.idContentSubject)}
                                                                >
                                                                    <FontAwesomeIcon icon={faTrash} />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                        {/* Form */}
                                        {contents.contents_subject &&
                                            contents.contents_subject.map(
                                                (title) =>
                                                    title.idContentSubject === idUpdate && (
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
                                                                <h2 className="text-center">Content Form</h2>
                                                                <form
                                                                    onSubmit={handleUpdate}
                                                                    className={cx('form-wrap')}
                                                                >
                                                                    <div>
                                                                        <label htmlFor="idTitleContent">
                                                                            ID Title Content
                                                                        </label>
                                                                        <input
                                                                            type="number"
                                                                            id="idTitleContent"
                                                                            name="idTitleContent"
                                                                            defaultValue={title.idTitleContent}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>

                                                                    <div>
                                                                        <label htmlFor="idSubject">ID Subject</label>
                                                                        <input
                                                                            type="number"
                                                                            id="idSubject"
                                                                            name="idSubject"
                                                                            defaultValue={title.idSubject}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>

                                                                    <div>
                                                                        <label htmlFor="nameContent">
                                                                            Name Content
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            id="nameContent"
                                                                            name="nameContent"
                                                                            defaultValue={title.nameContent}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label htmlFor="contentSubject">
                                                                            Content Subject
                                                                        </label>
                                                                        <textarea
                                                                            type="text"
                                                                            rows="4"
                                                                            cols="5"
                                                                            id="contentSubject"
                                                                            name="contentSubject"
                                                                            defaultValue={title.contentSubject}
                                                                            onChange={handleChange}
                                                                        ></textarea>
                                                                    </div>

                                                                    <button  type="submit">
                                                                        Submit
                                                                    </button>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    ),
                                            )}

                                        {/* Form */}
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
                                                    <h2 className="text-center">Content Form</h2>
                                                    <form onSubmit={handleAdd} className={cx('form-wrap')}>
                                                        <div>
                                                            <label htmlFor="idTitleContent">ID Title Content</label>
                                                            <input
                                                                type="number"
                                                                id="idTitleContent"
                                                                name="idTitleContent"
                                                                onChange={handleChange}
                                                            />
                                                        </div>

                                                        <div>
                                                            <label htmlFor="idSubject">ID Subject</label>
                                                            <input
                                                                type="number"
                                                                id="idSubject"
                                                                name="idSubject"
                                                                onChange={handleChange}
                                                            />
                                                        </div>

                                                        <div>
                                                            <label htmlFor="nameContent">Name Content</label>
                                                            <input
                                                                type="text"
                                                                id="nameContent"
                                                                name="nameContent"
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="contentSubject">Content Subject</label>
                                                            <textarea
                                                                type="text"
                                                                rows="4"
                                                                cols="5"
                                                                id="contentSubject"
                                                                name="contentSubject"
                                                                onChange={handleChange}
                                                            ></textarea>
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

export default Contents;
