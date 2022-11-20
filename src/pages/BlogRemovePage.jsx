import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';

import axios from 'axios';

const BlogRemovePage = () => {
  const { slug } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .delete(`http://localhost:8080/profile/removeblog/${slug}`)
      .then(data => {
        toast.success(data.data.message);
        navigate('/profile');
      })
      .catch(err => {
        // toast.error(err.response.data.message);
        navigate('/profile');
      });
  }, [navigate, slug]);

  return;
};

export default BlogRemovePage;
