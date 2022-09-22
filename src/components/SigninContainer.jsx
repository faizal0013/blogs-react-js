import { Link } from 'react-router-dom';

import CenterDiv from '../UI/CenterDiv/CenterDiv';
import ShadowBox from '../UI/shadow-box/ShadowBox';
import SigninFormContainer from './SigninFormContainer';

const SigninContainer = () => {
  return (
    <CenterDiv className={'flex justify-center my-14'}>
      <ShadowBox>
        <p className="mt-8 text-2xl">Sign In</p>
        <div className="border w-11/12"></div>
        <SigninFormContainer />
        <div className="border w-11/12"></div>
        <p className="felx items-center mb-8">
          Create a account?{' '}
          <Link to="/signup" className="text-blue-700 underline">
            Signup
          </Link>
        </p>
      </ShadowBox>
    </CenterDiv>
  );
};

export default SigninContainer;
