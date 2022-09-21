import { Link } from 'react-router-dom';
import AccountLayout from '../components/AccountLayout';
import SigninFormContainer from '../components/SigninFormContainer';

const SignInPage = () => {
  return (
    <AccountLayout
      labal={'Sign In'}
      otherElement={
        <>
          <span className="mr-3">Create a account?</span>
          <Link to="/signup" className="text-blue-700 underline">
            Signup
          </Link>
        </>
      }
      children={<SigninFormContainer />}
    />
  );
};

export default SignInPage;
