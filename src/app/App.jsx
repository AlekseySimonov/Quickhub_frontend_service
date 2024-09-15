import { BaseRouter } from '../pages/base/api/base';
import {Base} from '../pages/base/index';
// import { AutorizeRouter } from './routing/index';



export default function App() {

  return (
    <Base>
      <BaseRouter/>
    </Base>
    // <AutorizePage>
    //   <AutorizeRouter/>
    // </AutorizePage>
  )
}

