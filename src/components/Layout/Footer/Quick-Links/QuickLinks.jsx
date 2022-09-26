import { Link } from 'react-router-dom';

const QuickLinks = () => {
  return (
    <>
      <div className="flex flex-col gap-y-2">
        <p className="font-semibold">Quick Links</p>
        <ol className="list-disc flex flex-col gap-y-2">
          <li>
            <Link to="" className="list-disc">
              Home
            </Link>
          </li>
          <li>
            <Link to="blogs" className="list-disc">
              Blogs
            </Link>
          </li>
          <li>
            <Link to="about" className="list-disc">
              About Us
            </Link>
          </li>
        </ol>
      </div>
    </>
  );
};

export default QuickLinks;
