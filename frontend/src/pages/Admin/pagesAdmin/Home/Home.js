import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function Home() {
    return (
        <div>
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Dashboard</h1>
                            </div>
                            {/* /.col */}
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <a href="#">Home</a>
                                    </li>
                                    <li className="breadcrumb-item active">Dashboard</li>
                                </ol>
                            </div>
                            {/* /.col */}
                        </div>
                        {/* /.row */}
                    </div>
                    {/* /.container-fluid */}
                </div>
                {/* /.content-header */}
                {/* Main content */}
                <section className="content">
                    <div className="container-fluid">
                        <section className="w-100 connectedSortable">
                            {/* Custom tabs (Charts with tabs)*/}
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">
                                        <FontAwesomeIcon icon={faQuestion} className="pr-2" />
                                        Questions from students
                                    </h3>
                                </div>
                                {/* /.card-header */}
                                <div className="card-body">
                                    <div className="tab-content p-0">
                                        {/* Morris chart - Sales */}
                                        <div
                                            className="chart tab-pane active"
                                            id="revenue-chart"
                                            style={{ position: 'relative', height: 500 }}
                                        >
                                            <canvas id="revenue-chart-canvas" height={500} style={{ height: 500 }} />
                                        </div>
                                        <div
                                            className="chart tab-pane"
                                            id="sales-chart"
                                            style={{ position: 'relative', height: 500 }}
                                        >
                                            <canvas id="sales-chart-canvas" height={500} style={{ height: 500 }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Home;
