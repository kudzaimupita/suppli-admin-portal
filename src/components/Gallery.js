import React from 'react';
import ImageGallery from 'react-image-gallery';

class MyGallery extends React.Component {
  state = {
    images: [],
  };
  //
  render() {
    console.log(
      this.props.product.images &&
        this.props.product.images.map((image) => ({
          original: `https://suppli-images.s3.af-south-1.amazonaws.com/${image}`,
          thumbnail: `https://suppli-images.s3.af-south-1.amazonaws.com/${image}`,
        }))
    );
    return (
      <ImageGallery
        items={
          this.props.product.images
            ? this.props.product.images.map((image) => ({
                original: `https://suppli-images.s3.af-south-1.amazonaws.com/${image}`,
                thumbnail: `https://suppli-images.s3.af-south-1.amazonaws.com/${image}`,
              }))
            : this.state.images
        }
        showPlayButton={false}
        // thumbnailPosition={'left'}
      />
    );
  }
}

MyGallery.defaultProps = {
  product: {},
};
// thumbnailPosition="right"
export default MyGallery;
