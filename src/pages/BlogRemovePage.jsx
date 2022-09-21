import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

const BlogRemovePage = () => {
  const { _id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .delete(`http://localhost:8080/profile/removeblog/${_id}`)
      .then(data => {
        console.log(data.data);
      })
      .catch(err => console.log(err));

    navigate('/profile');
  }, [navigate, _id]);

  return;
};

export default BlogRemovePage;
