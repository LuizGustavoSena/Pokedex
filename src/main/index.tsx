import Itens from '@/presentation/pages/itens';
import ReactDOM from 'react-dom/client';
import { makeRemotePokemon } from './factories/usecases';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <Itens remotePokemon={makeRemotePokemon()} />
  )
