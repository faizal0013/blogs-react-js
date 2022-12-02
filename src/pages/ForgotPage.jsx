import CenterDiv from '../UI/CenterDiv/CenterDiv';
import AccountLayout from '../components/AccountLayout';
import ForgotPasswordForm from '../components/ForgotPasswordForm';

const ForgotPage = () => {
  return (
    <CenterDiv>
      <AccountLayout labal={'forgot password'} children={<ForgotPasswordForm />} />
    </CenterDiv>
  );
};

export default ForgotPage;
