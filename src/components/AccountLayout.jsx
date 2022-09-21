import CenterDiv from '../UI/CenterDiv/CenterDiv';
import ShadowBox from '../UI/ShadowBox/ShadowBox';

const AccountLayout = ({ children, labal, otherElement }) => {
  return (
    <CenterDiv className={'flex justify-center my-14'}>
      <ShadowBox>
        <h1 className="mt-8 text-2xl">{labal}</h1>
        <div className="border w-11/12"></div>
        {children}
        <div className="border w-11/12"></div>
        <p className="felx items-center mb-8">{otherElement}</p>
      </ShadowBox>
    </CenterDiv>
  );
};

export default AccountLayout;
