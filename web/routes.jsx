import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { PagesServices } from './pages/PagesServices';

export function Navigations() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/PagesServices' element={<PagesServices />} />
            </Routes>
        </BrowserRouter>
    );
}
