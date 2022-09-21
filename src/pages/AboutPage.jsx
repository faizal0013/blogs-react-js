import { useEffect, useState } from 'react';
import { FadeLoader } from 'react-spinners';

import CenterDiv from '../UI/CenterDiv/CenterDiv';

import SamanthaGade from '../assets/images/Samantha-Gade.jpg';
import JessBailey from '../assets/images/jess-bailey.jpg';
import Coffee from '../assets/images/coffee.jpg';

const AboutPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <>
      <CenterDiv className={'flex flex-col gap-y-16'}>
        <div className="text-center w-8/12 mx-auto">
          <h2 className="text-6xl font-serif">Time to get communicate and share knowledge with each other.</h2>
        </div>
        <div className="flex justify-center">
          <div className="w-8/12 overflow-hidden rounded-2xl">
            {loading ? (
              <div className="flex justify-center items-center">
                <FadeLoader loading={loading} />
              </div>
            ) : (
              <img src={SamanthaGade} alt="Samantha-Gade" className="h-[30rem] scale-125 w-full" />
            )}
          </div>
        </div>
        <div className="w-8/12 mx-auto">
          <div className="grid grid-cols-2 gap-10">
            <div className="row-span-3 overflow-hidden shadow-xl">
              {loading ? (
                <div className="flex justify-center  items-center">
                  <FadeLoader loading={loading} />
                </div>
              ) : (
                <img src={JessBailey} alt="JessBailey" className="h-[35rem] scale-125" />
              )}
            </div>
            <div className="p-5 leading-loose shadow-xl">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus
                eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos
                cupiditate dolore doloribus!
              </p>
            </div>
            <div className="p-5 leading-loose shadow-xl">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus
                eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos
                cupiditate dolore doloribus!
              </p>
            </div>
            <div className="row-span-3 overflow-hidden shadow-xl">
              {loading ? (
                <div className="flex justify-center items-center">
                  <FadeLoader loading={loading} />
                </div>
              ) : (
                <img src={Coffee} alt="Coffee" className="h-[35rem] scale-125" />
              )}
            </div>
            <div className="p-5 leading-loose shadow-xl">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus
                eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos
                cupiditate dolore doloribus!
              </p>
            </div>
            <div className="p-5 leading-loose shadow-xl">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus
                eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos
                cupiditate dolore doloribus!
              </p>
            </div>
          </div>
        </div>
      </CenterDiv>
    </>
  );
};

export default AboutPage;
