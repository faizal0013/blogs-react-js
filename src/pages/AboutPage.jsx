import CenterDiv from '../UI/CenterDiv/CenterDiv';

import { LazyLoadImage } from 'react-lazy-load-image-component';

import SamanthaGade from '../assets/images/Samantha-Gade.jpg';
import JessBailey from '../assets/images/jess-bailey.jpg';
import Coffee from '../assets/images/coffee.jpg';

const AboutPage = () => {
  return (
    <>
      <CenterDiv className={'flex flex-col gap-y-16'}>
        <div className="text-center w-8/12 mx-auto">
          <p className="text-6xl font-serif">Time to get communicate and share knowledge with each other.</p>
        </div>
        <div className="flex justify-center">
          <div className="w-8/12 overflow-hidden rounded-2xl">
            <LazyLoadImage
              src={SamanthaGade}
              effect="blur"
              alt="Samantha-Gade"
              className="h-[30rem] scale-125 w-full"
            />
          </div>
        </div>
        <div className="w-8/12 mx-auto">
          <div className="grid grid-cols-2 gap-10">
            <div className="row-span-3 overflow-hidden shadow-xl">
              <LazyLoadImage src={JessBailey} effect="blur" alt="JessBailey" className="h-[35rem] scale-125" />
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
              <LazyLoadImage src={Coffee} effect="blur" alt="Coffee" className="h-[35rem] scale-125" />
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
