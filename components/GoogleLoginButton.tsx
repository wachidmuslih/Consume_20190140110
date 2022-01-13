import React, { Component } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";

const CLIENT_ID =
    "672312188455-avvi7k0i412t1ba2mc89o80j5n28r09b.apps.googleusercontent.com";

interface Props {

}
interface UserInfo {
    name: string;
    emailId: string;
}

interface States {
    isLoggedIn: boolean;
    userInfo: UserInfo;
}

class GoogleLoginComponent extends Component<Props, States> {
    constructor(props:Props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            userInfo: {
                name: "",
                emailId: "",
            },
        };
    }

    // Success Handler
    responseGoogleSuccess = (response: { profileObj: { name: any; email: any; }; }) => {
        console.log();
        let userInfo = {
            name: response.profileObj.name,
            emailId: response.profileObj.email,
        };
        this.setState({ userInfo, isLoggedIn: true });
    };

    // Error Handler
    responseGoogleError = (response: any) => {
        console.log(response);
    };

    // Logout Session and Update State
    logout = (response: any) => {
        console.log(response);
        let userInfo = {
            name: "",
            emailId: "",
        };
        this.setState({ userInfo, isLoggedIn: false });
    };

    render() {
        return (
            <div className="row mt-3">
                <div className="col-md-12">
                    {this.state.isLoggedIn ? (
                        <div>
                            <h1>Welcome, {this.state.userInfo.name}</h1>

                            <GoogleLogout
                                clientId={CLIENT_ID}
                                buttonText={"Logout"}
                                onLogoutSuccess={this.logout}
                            ></GoogleLogout>
                        </div>
                    ) : (
                        <GoogleLogin
                            clientId={CLIENT_ID}
                            buttonText="Sign In with Google"
                            onSuccess={this.responseGoogleSuccess}
                            onFailure={this.responseGoogleError}
                            isSignedIn={true}
                            cookiePolicy={"single_host_origin"}
                        />
                    )}
                </div>
            </div>
        );
    }
}
export default GoogleLoginComponent;