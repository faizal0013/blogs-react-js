import { RiInstagramFill, RiFacebookBoxFill, RiTwitterFill } from 'react-icons/ri';

const SocialMedias = () => {
  return (
    <>
      <div className="flex flex-col gap-y-2">
        <h6 className="font-semibold">Social Medias</h6>
        <div className="flex flex-col gap-y-2">
          <a href="https://www.instagram.com/" target={'_blank'} rel="noopener noreferrer">
            <span className="flex gap-x-4">
              <RiInstagramFill className="text-3xl" />
              <p>Instagram</p>
            </span>
          </a>
          <a href="https://www.facebook.com/" target={'_blank'} rel="noopener noreferrer">
            <span className="flex gap-x-4">
              <RiFacebookBoxFill className="text-3xl" />
              <p>Facebook</p>
            </span>
          </a>
          <a href="https://twitter.com/" target={'_blank'} rel="noopener noreferrer">
            <span className="flex gap-x-4">
              <RiTwitterFill className="text-3xl" />
              <p>Twitter</p>
            </span>
          </a>
        </div>
      </div>
    </>
  );
};

export default SocialMedias;
