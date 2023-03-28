import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { NotFound } from './pages/NotFound';
import { ProtectedRoutes } from './pages/ProtectedRoutes';
import { PublicRoutes } from './pages/PublicRoutes';
import RegisterPage from './pages/RegisterPage';
import ShopPage from './pages/ShopPage';
import { ProductsProvider } from './providers/ProductsContext';

const Router = () => (
  <Routes>
    <Route path='/' element={<PublicRoutes />}>
      <Route index element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='*' element={<NotFound />} />
    </Route>

    <Route path='/shop' element={<ProtectedRoutes />}>
      <Route
        index
        element={
          <ProductsProvider>
            <ShopPage />
          </ProductsProvider>
        }
      />
    </Route>
  </Routes>
);

export default Router;
