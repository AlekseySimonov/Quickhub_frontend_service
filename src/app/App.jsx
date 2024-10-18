import { useSelector } from 'react-redux';
import { appRouter } from '../pages/routing/index';
import { RouterProvider } from 'react-router-dom';

export default function App() {
  const isAuth = useSelector((state) => state.user.isAuth)
  console.log(isAuth)
  return (<RouterProvider router={appRouter}/>)
}

