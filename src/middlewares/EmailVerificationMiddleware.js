import { Navigate, useParams } from 'react-router-dom';
import { decodeToken } from 'react-jwt';
import EmailVerificationScreen from '../components/auth/EmailVerificationScreen';

const EmailVerificationMiddleware = () => {
  const { token } = useParams();

  const payload = decodeToken(
    token
  );

  return payload?.uid ? <EmailVerificationScreen token={token} /> : <Navigate to='/' />;
}

export default EmailVerificationMiddleware;