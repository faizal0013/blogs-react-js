import { useParams } from 'react-router-dom';
import AccountLayout from '../components/AccountLayout';
import ChangePasswordForm from '../components/ChangePasswordForm';

const ChangePassword = () => {
  const { token } = useParams();

  return (
    <>
      <div className="mt-40">
        <AccountLayout labal="change password" children={<ChangePasswordForm token={token} />} />
      </div>
    </>
  );
};

export default ChangePassword;
