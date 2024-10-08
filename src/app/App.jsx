// import { BaseRouter } from './routing/index';
// import {Base} from '../pages/base/index';
import { AutorizeRouter } from './routing/index';
import { AutorizePage } from '../pages/autorize';

export default function App() {

  return (
        <AutorizePage>
          <AutorizeRouter/>
        </AutorizePage>
      //<Base>
      //  <BaseRouter/>
      //</Base>
    
  )
}

