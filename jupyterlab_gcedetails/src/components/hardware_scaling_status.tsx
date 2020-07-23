import * as React from 'react';

enum Status {
  'Authorizing',
  'Stopping Instance',
  'Reshaping Instance',
  'Starting Instance',
}

interface State {
  status: Status;
  authToken?: string;
}
export class HardwareScalingStatus extends React.Component<{}, State> {
  private authPopup: any;
  private readonly listener = (message: MessageEvent) => {
    this.authPopup.close();
    window.removeEventListener('message', this.listener);
    this.setState({
      status: Status['Reshaping Instance'],
      authToken: message.data['credentials'],
    });
  };
  private readonly oAuthHost =
    'https://us-central1-prodonjs-dev.cloudfunctions.net';
  constructor(props: {}) {
    super(props);
    this.state = {
      status: Status.Authorizing,
    };
  }

  componentDidMount() {
    window.addEventListener('message', this.listener);
    this.authPopup = window.open(
      `${this.oAuthHost}/authorize`,
      '_authPopup',
      'left=100,top=100,width=400,height=400'
    );
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.listener);
  }

  render() {
    return <h1>{this.state.status}</h1>;
  }
}
