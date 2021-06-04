import React from 'react';

import NotificationAlert from 'react-notification-alert';
import { connect } from 'react-redux';
import { SelectAlert } from '../selectors/alertSelector';

class Alert extends React.PureComponent {
  componentDidUpdate(prevState) {
    if (prevState.alerts !== this.props.alerts) {
      this.renderAlert();
    }
  }
  notify = (place, type, message, id) => {
    var options = {};
    options = {
      place: place,
      message: (
        <div className="alert-text">
          <span data-notify="message">
            {'  '}
            {message}
          </span>
        </div>
      ),
      type: type,
      icon: 'ni ni-bell-55',
      autoDismiss: 3,
    };
    this.refs.notificationAlert.notificationAlert(options);
  };

  renderAlert() {
    {
      this.props.alerts.map((alert) =>
        this.notify('tl', alert.alertType, alert.msg, alert.id)
      );
    }
  }

  render() {
    return (
      <>
        <div className="rna-wrapper">
          <NotificationAlert ref="notificationAlert" />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  alerts: SelectAlert(state),
});

export default connect(mapStateToProps)(Alert);
