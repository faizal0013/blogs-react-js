import { useNavigate } from 'react-router-dom';

import CenterDiv from '../UI/CenterDiv/CenterDiv';

const PageNotFound = () => {
  const navigate = useNavigate();

  const goBackHander = () => {
    navigate(-1);
  };

  return (
    <>
      <CenterDiv>
        <div className="my-5">
          <button
            onClick={goBackHander}
            className="px-7 py-5 text-white bg-gray-400 font-bold rounded-full transition-all duration-300 ease-in-out hover:bg-gray-500"
          >
            Back
          </button>
        </div>
      </CenterDiv>
      <img src={require('../assets/images/404.jpg')} alt="" />
    </>
  );
};

export default PageNotFound;