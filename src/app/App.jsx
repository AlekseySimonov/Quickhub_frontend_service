import { appRouter } from '../pages/routing/index';
import { RouterProvider} from 'react-router-dom';

export default function App() {

  return (<RouterProvider router={appRouter}/>)
}

