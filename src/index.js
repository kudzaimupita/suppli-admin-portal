import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './assets/vendors/style';
import './styles/wieldy.less';
import './assets/vendor/nucleo/css/nucleo.css';
import './assets/vendor/font-awesome/css/font-awesome.min.css';
import './assets/scss/argon-dashboard-react.scss';
import 'react-notification-alert/dist/animate.css';
import './assets/scss/image-gallery.scss';
import 'antd/dist/antd.css';

ReactDOM.render(
  <App />,

  document.getElementById('root')
);
