import SimpleImageSlider from 'react-simple-image-slider';

const ImageSliders = ({ posts }) => {
  const images = posts.map(post => `http://localhost:8080/static/uploads/${post.image}`);

  return (
    <>
      <SimpleImageSlider
        width={1600}
        height={700}
        images={images}
        autoPlay={true}
        showBullets={true}
        showNavs={true}
        navStyle={2}
        slideDuration={1.3}
        navSize={60}
      />
    </>
  );
};

export default ImageSliders;
