export function authTokenRetrieval(): Promise<string> {
  let authPopup: Window;
  let timer: number;
  const authOrigin = 'https://tokenserver-dot-beatrix-dev.uc.r.appspot.com';
  return new Promise<string>((resolve, reject) => {
    const listener = (message: MessageEvent) => {
      if (
        message.origin === authOrigin &&
        (message.data['error'] || message.data['credentials'])
      ) {
        authPopup.close();
        clearInterval(timer);
        window.removeEventListener('message', listener);
        if (message.data['error']) {
          reject('Failed to get authentication token');
        } else {
          resolve(message.data['credentials']);
        }
      }
    };
    window.addEventListener('message', listener);
    authPopup = window.open(
      `${authOrigin}/authorize`,
      '_authPopup',
      'left=100,top=100,width=400,height=400'
    );
    timer = window.setInterval(function() {
      if (authPopup.closed) {
        window.clearInterval(timer);
        window.removeEventListener('message', listener);
        reject('User exited authentication flow');
      }
    }, 1000);
  });
}
