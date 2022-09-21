import CenterDiv from '../../../UI/CenterDiv/CenterDiv';
import QuickLinks from './Quick-Links/QuickLinks';
import SocialMedias from './Social-Media/SocialMedias';

const Footer = () => {
  return (
    <>
      <CenterDiv className={'flex justify-around py-6'}>
        <QuickLinks />
        <SocialMedias />
      </CenterDiv>
    </>
  );
};

export default Footer;
