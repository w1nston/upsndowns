import Loadable from 'react-loadable';
import Loading from '../components/Loading';

export const createLoadableComponent = loaderFn => Loadable({
  loader: loaderFn,
  loading: Loading,
});