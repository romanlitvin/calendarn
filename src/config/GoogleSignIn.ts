import config from "./index";
import { GoogleApi } from "./GoogleApi";

export class GoogleSignIn extends GoogleApi {
  private readonly authGapiConfig = {
    client_id: config.CLIENT_ID,
    scope: "https://www.googleapis.com/auth/calendar",
    cookie_policy: "single_host_origin",
  };
  private accessToken = "";

  public authorizeWithGoogle = (): Promise<void> =>
    new Promise((resolve, reject) => {
      gapi.auth2.authorize(this.authGapiConfig, async (authResponse) => {
        if (authResponse.access_token) {
          await this.onAuthSuccess(authResponse);
          resolve();
        } else {
          reject("cannot authorize with google");
        }
      });
    });

  public get isCustomerAuthed(): boolean {
    const accessToken = localStorage.getItem("googleAuthToken");
    if (accessToken) {
      this.setAccessToken(accessToken);
      return true;
    }
    return false;
  }

  public setUpGoogleServices = async (): Promise<void> => {
    await this.initAuthClient();
    await this.initGoogleClient();
  };

  private setAccessToken = (input: string): string =>
    (this.accessToken = input);

  private initAuthClient = async () => {
    try {
      //@ts-ignore
      await gapi.auth2.init(this.authGapiConfig);
    } catch (err) {
      console.log("err init auth client", err.message);
    }
  };

  private onAuthSuccess = async (
    authResponse: gapi.auth2.AuthorizeResponse,
  ): Promise<void> => {
    await this.initAuthClient();
    await this.initGoogleClient();
    this.setAccessToken(authResponse.access_token);
    localStorage.setItem("googleAuthToken", this.accessToken);
  };
}

export const GoogleSignInInstance = new GoogleSignIn();
