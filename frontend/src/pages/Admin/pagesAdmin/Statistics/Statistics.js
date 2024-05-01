import React, { useEffect, useState } from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import style from './Statistics.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';

const cx = classNames.bind(style);
function Statistics() {
    const [statistics, setStatistics] = useState([]);
    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/statisticsAPIViewAll/')
            .then((res) => {
                setStatistics(res.data);
            })
            .catch((error) => {
                console.error('Lỗi', error);
            });
    }, []);
    // console.log(statistics.statistics);

    var month = [0, 0, 0, 0];
    var price_month = [0, 0, 0, 0];
    var year = [];
    var price_year = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    const handleYear = (nam) => {
        // Chèn phần tử mới vào cuối mảng
        year.push(nam);

        // Sắp xếp mảng tăng dần
        year.sort((a, b) => a - b);
        // Loại bỏ trùng nhau
        year = [...new Set(year)];
    };
    if (statistics.statistics) {
        statistics.statistics.filter((value, index) => {
            let nam = value.time.split('-')[0];
            handleYear(nam);

            year.filter((value)=>{
                if(value === nam){
                    
                }

            })

            let thang = value.time.split('-')[1];

            switch (parseInt(thang)) {
                case 1:
                    price_year[0] += parseFloat(value.price);
                    break;
                case 2:
                    price_year[1] += parseFloat(value.price);
                    break;
                case 3:
                    price_year[2] += parseFloat(value.price);
                    break;
                case 4:
                    price_year[3] += parseFloat(value.price);
                    break;
                case 5:
                    price_year[4] += parseFloat(value.price);
                    break;
                case 6:
                    price_year[5] += parseFloat(value.price);
                    break;
                case 7:
                    price_year[6] += parseFloat(value.price);
                    break;
                case 8:
                    price_year[7] += parseFloat(value.price);
                    break;
                case 9:
                    price_year[8] += parseFloat(value.price);
                    break;
                case 10:
                    price_year[9] += parseFloat(value.price);
                    break;
                case 11:
                    price_year[10] += parseFloat(value.price);
                    break;
                case 12:
                    price_year[11] += parseFloat(value.price);
                    break;
                default:
                    console.log('Không xác định');
                    break;
            }
        });
    }

    const dataThang = [
        {
            name: 'Tháng 1',
            Statistic: price_year[0],
        },
        {
            name: 'Tháng 2',
            Statistic: price_year[1],
        },
        {
            name: 'Tháng 3',
            Statistic: price_year[2],
        },
        {
            name: 'Tháng 4',
            Statistic: price_year[3],
        },
        {
            name: 'Tháng 5',
            Statistic: price_year[4],
        },
        {
            name: 'Tháng 6',
            Statistic: price_year[5],
        },
        {
            name: 'Tháng 7',
            Statistic: price_year[6],
        },
        {
            name: 'Tháng 8',
            Statistic: price_year[7],
        },
        {
            name: 'Tháng 9',
            Statistic: price_year[8],
        },
        {
            name: 'Tháng 10',
            Statistic: price_year[9],
        },
        {
            name: 'Tháng 11',
            Statistic: price_year[10],
        },
        {
            name: 'Tháng 12',
            Statistic: price_year[11],
        },
    ];

    return (
        <div className={cx('wrap-chart')}>
            <BarChart width={800} height={500} data={dataThang}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" name="Tháng" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Bar dataKey="Statistic" fill="#82ca9d" />
            </BarChart>
            <div className="d-flex flex-column">
                <div className={cx('sap-xep')}>
                    <select id="mySelect-week" className="form-select form-select-lg mb-3">
                        <option selected>----- Chọn Tuần ----</option>
                        <option value="week">Tuần</option>
                        <option value="month">Tháng</option>
                        <option value="year">Năm</option>
                    </select>
                </div>
                <div className={cx('sap-xep')}>
                    <select id="mySelect-month" className="form-select form-select-lg mb-3">
                        <option selected>----- Chọn Tháng ----</option>
                        <option value="thang1">Tháng 1</option>
                        <option value="thang2">Tháng 2</option>
                        <option value="thang3">Tháng 3</option>
                        <option value="thang4">Tháng 4</option>
                        <option value="thang5">Tháng 5</option>
                        <option value="thang6">Tháng 6</option>
                        <option value="thang7">Tháng 7</option>
                        <option value="thang8">Tháng 8</option>
                        <option value="thang9">Tháng 9</option>
                        <option value="thang10">Tháng 10</option>
                        <option value="thang11">Tháng 11</option>
                        <option value="thang12">Tháng 12</option>
                    </select>
                </div>
                <div className={cx('sap-xep')}>
                    <select id="mySelect-year" className="form-select form-select-lg mb-3">
                        <option selected>----- Chọn Năm ----</option>
                        {year.map((nam) => (
                            <option value={'year' + nam}>{nam}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}

export default Statistics;
