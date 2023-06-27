import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {Navigate} from 'react-router-dom';
import { userAccountVerification } from '../../actions/userActions';

const EmailVerificationScreen = ({ token }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userAccountVerification(token));
  }, [dispatch, token]);

  return <Navigate to='/' />
}

      export default EmailVerificationScreen;