import {Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Loader from '../components/ui/Loader';

const AdminPrivateRouter = ({children}) => {
  const {admin,checking}=useSelector(state=>state.auth);

  if(admin===undefined && checking===true) return <Loader />;
  
  return admin?children:<Navigate to='/' />;
}

export default AdminPrivateRouter;