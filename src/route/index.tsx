import { lazy } from 'react';

const Test = lazy(() => import('../pages/a1'));
const Test2 = lazy(() => import('../pages/a2'));
const CreatePlan = lazy(() => import('../pages/a1/indexD'));
const Layout = lazy(() => import('../components/layout'));


export const routeConfig = [
    {
        path: '/',
        element: <Layout />, // 普通布局（带侧边栏）
        children: [
            { path: '/', element: <Test /> },
            {
                name: 'test',
                path: '/test',
                element: <Test2 />,
            },
        ]
    },

    {
        name: 'createPlan',
        path: '/createPlan/:id?',
        element: <CreatePlan />,
    },

];
