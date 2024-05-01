import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/authcontext';
import { publicRoutes, privateRoutes } from '~/routes';
import {
    HeaderAndFooter,
    VerticalSidebar,
    HorizontalSidebar,
    HorizontalSidebarRight,
    HeaderOnly,
} from '~/components/Layout';
import { Fragment } from 'react';

function App() {
    // window.location.reload();
    let position = '';
    position = sessionStorage.getItem('position');
    return (
        <AuthProvider>
            <Router>
                <div className="App" color="--primary">
                    <Routes>
                        {console.log(position)}
                        {publicRoutes.map((route, index) => {
                            const Layout =
                                route.layout === 'VerticalSidebar'
                                    ? VerticalSidebar
                                    : route.layout === 'HorizontalSidebar'
                                    ? HorizontalSidebar
                                    : route.layout === 'HorizontalSidebarRight'
                                    ? HorizontalSidebarRight
                                    : route.layout === 'OnlyHeader'
                                    ? HeaderOnly
                                    : route.layout === 'Admin'
                                    ? Fragment
                                    : HeaderAndFooter;
                            const Page = route.component;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}

                        {position &&
                            (position === 'Teacher' || position === 'Admin' ? (
                                privateRoutes.map((route, index) => {
                                    const Layout = Fragment;
                                    const Page = route.component;
                                    return (
                                        <Route
                                            key={index}
                                            path={route.path}
                                            element={
                                                <Layout>
                                                    <Page />
                                                </Layout>
                                            }
                                        />
                                    );
                                })
                            ) : (
                                <Route key="redirect" path="*" element={<Navigate to="/" replace />} />
                            ))}
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
