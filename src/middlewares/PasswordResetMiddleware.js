import { Navigate, useParams } from 'react-router-dom';
import { decodeToken } from 'react-jwt';
import ResetPasswordScreen from '../components/auth/ResetPasswordScreen';

const PasswordResetMiddleware = () => {
  const { token } = useParams();

  const payload = decodeToken(
    token
  );

  return payload?.correo ? <ResetPasswordScreen token={token} /> : <Navigate to='/login' />;
}

export default PasswordResetMiddleware;