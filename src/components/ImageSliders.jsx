import SimpleImageSlider from 'react-simple-image-slider';

const ImageSliders = ({ posts }) => {
  const images = posts.map(post => require(`../assets/uploads/${post.image}`));

  return (
    <div>
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
    </div>
  );
};

export default ImageSliders;
