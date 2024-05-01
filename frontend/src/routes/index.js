// import { HeaderOnly } from '~/components/Layout';
import HomePage from '~/pages/Home';
import { Code, Momo } from '~/pages/Code';
import LoginPage from '~/pages/Login';
import RegisterPage from '~/pages/Register';
import ContentCourse from '~/pages/Courses';
import AdminPage from '~/pages/Admin';
import { TracNghiemSubject, LyThuyetSubject, Exercise, DoExercise, MenuLyThuyet } from '~/pages/Subject';
import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import Summary from '~/pages/Summary';

// Khong can dang nhap van vao dc
const publicRoutes = [
    { path: '/', component: HomePage, layout: null },
    // { path: '/admin/:option', component: AdminPage, layout: 'Admin' },
    { path: '/code', component: Code, layout: null },
    { path: '/courses/:course/:subject/summary/:point/:time/:totalQuestions', component: Summary, layout: null },
    { path: '/login', component: LoginPage, layout: null },
    { path: '/register', component: RegisterPage, layout: null },
    { path: '/code/Momo', component: Momo, layout: null },
    { path: '/courses/:course', component: ContentCourse, layout: 'VerticalSidebar' },
    { path: '/courses/:course/:subject', component: ContentCourse, layout: 'VerticalSidebar' },

    { path: '/courses/:course/:subject/:type', component: SubjectPage, layout: 'HorizontalSidebar' },
    {
        path: '/courses/:course/:subject/LyThuyet/:idCS/:bai',
        component: LyThuyetSubject,
        layout: 'HorizontalSidebarRight',
    },
    {
        path: '/courses/:course/:subject/TracNghiem/:idCS/:bai',
        component: Exercise,
        layout: null,
    },

    { path: '/courses/:course/:subject/LamBaiTap/:idCS/:bai', component: DoExercise, layout: 'OnlyHeader' },
];

function SubjectPage() {
    const { type } = useParams();
    switch (type) {
        case 'TracNghiem':
            return <TracNghiemSubject />;
        case 'MenuLyThuyet':
            return <MenuLyThuyet />;

        default:
            return <Fragment />;
    }
}

// Phai dang nhap moi vao

// const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route {...rest} render={(props) => (
//       isAuthenticated()
//         ? <Component {...props} />
//         : <Redirect to='/login' />
//     )} />
//   );

const isAuthenticated = () => {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    // Trả về true nếu đã đăng nhập, ngược lại trả về false
};
const privateRoutes = [{ path: '/admin/:option', component: AdminPage, layout: 'Admin' }];
export { publicRoutes, privateRoutes };
