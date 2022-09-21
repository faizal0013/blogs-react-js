import { Link } from 'react-router-dom';

import SignupFormContainer from '../components/SignupFormContainer';
import AccountLayout from '../components/AccountLayout';

const SignupPage = () => {
  return (
    <AccountLayout
      labal={'Sign Up'}
      otherElement={
        <>
          <span className="mr-3">Alread have a account?</span>
          <Link to="/signin" className="text-blue-700 underline">
            Signin
          </Link>
        </>
      }
      children={<SignupFormContainer />}
    />
  );
};

export default SignupPage;
