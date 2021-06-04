import React from 'react';
import ImageGallery from 'react-image-gallery';

class MyGallery extends React.Component {
  state = {
    images: [],
  };
  //
  render() {
    // console.log(
    //   this.props.images &&
    //     this.props.images.map((image) => ({
    //       original: `http://localhost:5000/img/refunds/${image}`,
    //       thumbnail: `http://localhost:5000/img/refunds/${image}`,
    //     }))
    // );
    return (
      <ImageGallery
        items={
          this.props.images
            ? this.props.images.map((image) => ({
                original: `http://localhost:5000/img/refunds/${image}`,
                thumbnail: `http://localhost:5000/img/refunds/${image}`,
              }))
            : this.state.images
        }
        showPlayButton="false"
      />
    );
  }
}

MyGallery.defaultProps = {
  product: {},
};
// thumbnailPosition="right"
export default MyGallery;
