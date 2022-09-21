import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';

import axios from 'axios';

const BlogRemovePage = () => {
  const { _id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .delete(`http://localhost:8080/profile/removeblog/${_id}`)
      .then(data => {
        toast.success(data.data.message);
        navigate(-1);
      })
      .catch(err => toast.error(err.response.data.message));
  }, [navigate, _id]);

  return;
};

export default BlogRemovePage;
