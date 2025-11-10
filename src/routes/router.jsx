import { createBrowserRouter } from 'react-router-dom'
import App from '../App.jsx'
import Home from '../pages/Home.jsx'
import Models from '../pages/Models.jsx'
import ModelDetails from '../pages/ModelDetails.jsx'
import AddModel from '../pages/AddModel.jsx'
import UpdateModel from '../pages/UpdateModel.jsx'
import MyModels from '../pages/MyModels.jsx'
import MyPurchases from '../pages/MyPurchases.jsx'
import Login from '../pages/Login.jsx'
import Register from '../pages/Register.jsx'
import NotFound from '../pages/NotFound.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'models', element: <Models /> },
      { path: 'models/:id', element: <ModelDetails /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'add-model', element: <AddModel /> },
          { path: 'update-model/:id', element: <UpdateModel /> },
          { path: 'me/models', element: <MyModels /> },
          { path: 'me/purchases', element: <MyPurchases /> }
        ]
      },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> }
    ]
  }
])
