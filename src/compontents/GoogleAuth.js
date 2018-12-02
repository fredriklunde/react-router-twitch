import React from 'react';

class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '970891140678-f9pblo6m3hbcl7bhg184vfgd5bpnj02j.apps.googleusercontent.com',
                scope: 'email'
            });
        });
    }
    render() {
        return <div> Google Auth</div>
    }
}

export default GoogleAuth;