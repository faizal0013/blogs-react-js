import { useEffect, useState } from 'react';
import { HashLoader } from 'react-spinners';

import axios from 'axios';

import CenterDiv from '../UI/CenterDiv/CenterDiv';
import LetestPostContainer from '../components/LetestPostContainer';
import ImageSliders from '../components/ImageSliders';

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/')
      .then(data => {
        setPosts(data.data);
        setLoading(false);
      })
      .catch();
  }, []);

  return (
    <>
      <CenterDiv>
        {loading ? (
          <div className="flex justify-center items-center h-[51rem]">
            <HashLoader size={115} color="#36d7b7" loading={loading} />
          </div>
        ) : (
          <>
            <ImageSliders posts={posts} />
            <LetestPostContainer posts={posts} />
          </>
        )}
      </CenterDiv>
    </>
  );
};

export default HomePage;
