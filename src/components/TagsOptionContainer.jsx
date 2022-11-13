import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';

import axios from 'axios';

import TagContainer from './TagContainer';

const TagsOptionContainer = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:8080/tags/')
      .then(data => {
        setTags(data.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <div className="my-6">
        <h1 className="text-2xl mt-10">Tags</h1>
      </div>
      {loading ? (
        <div className="text-center">
          <PulseLoader size={20} color="#000000" loading={loading} />
        </div>
      ) : (
        <>
          <div className="flex gap-x-6 flex-wrap gap-y-5">
            <Link
              to={{
                pathname: '/',
                search: '?tag=all',
              }}
              className="border-2 border-neutral-300 py-2 px-8"
            >
              All
            </Link>
            {tags.map(tag => (
              <Link
                to={{
                  pathname: '/',
                  search: `?tag=${tag.tag_name}`,
                }}
                key={tag._id}
                className="border-2 border-neutral-300 py-2 px-8"
              >
                {tag.tag_name}
              </Link>
            ))}
          </div>
          <div className="mt-5">
            <TagContainer />
          </div>
        </>
      )}
    </>
  );
};

export default TagsOptionContainer;
