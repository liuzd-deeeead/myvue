import {Routes, Route} from 'react-router-dom';

import './App.css'
import {routeConfig} from "./route";

// App.jsx
const renderRoutes = (routes) => {
    return routes.map((route) => (
        <Route
            key={route.path}
            path={route.path}
            element={route.element}
        >
            {route.children && renderRoutes(route.children)} {/* 递归渲染子路由 */}
        </Route>
    ));
};

function App() {
    return (
        <Routes>
            {renderRoutes(routeConfig)}
        </Routes>
    );
}

export default App
