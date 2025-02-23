import {createBrowserRouter} from 'react-router-dom';
import ProductIndex from './views/ProductIndex';


const router = createBrowserRouter([
    {
        path: '/',
        element: <ProductIndex/>
    },
    {
        path: '*',
        element: <ProductIndex/>
    }
]);

export default router;
