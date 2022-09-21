import { FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <Link to="/profile" className="p-5 text-xl">
      <FiUser className="w-8 rounded-full text-3xl" />
    </Link>
  );
};

export default Profile;
