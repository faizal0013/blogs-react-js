import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';

import axios from 'axios';

import CenterDiv from '../UI/CenterDiv/CenterDiv';
import LetestPostContainer from '../components/LetestPostContainer';
import ImageSliders from '../components/ImageSliders';
import TagsOptionContainer from '../components/TagsOptionContainer';

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
            <ClipLoader size={115} color="#000000" loading={loading} />
          </div>
        ) : (
          <>
            <ImageSliders posts={posts} />
            <LetestPostContainer posts={posts} />
            <TagsOptionContainer />
          </>
        )}
      </CenterDiv>
    </>
  );
};

export default HomePage;
