import {Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Loader from '../components/ui/Loader';

const PrivateRouter = ({children}) => {
  const {uid,checking}=useSelector(state=>state.auth);
  
  if(uid===undefined && checking===true){
    return <Loader />;
  } 
  
  return uid?children:<Navigate to='/' />;
}

export default PrivateRouter;