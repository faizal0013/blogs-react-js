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
        navigate(-1);
      })
      .catch(err => {
        toast.error(err.response.data.message);
        navigate(-1);
      });
  }, [navigate, slug]);

  return;
};

export default BlogRemovePage;
