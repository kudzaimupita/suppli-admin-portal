import React from 'react';

import { Container } from 'reactstrap';

class UserHeader extends React.Component {
  render() {
    return (
      <>
        <div
          className="header pb-8 pt-5 pt-lg-6 d-flex align-items-center"
          style={{
            minHeight: '50px',
            // backgroundImage:
            //   'url(' + require('assets/img/theme/profile-cover.jpg') + ')',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        >
          <span className="mask bg-dark" />

          <Container className="d-flex align-items-center" fluid></Container>
        </div>
      </>
    );
  }
}

export default UserHeader;
