import config from "./index";

export class GoogleApi {
  protected static isGoogleAPIConfigured = false;

  private readonly onInitSuccess:
    | { (): void; (...args: any[]): void }
    | undefined;
  private readonly DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];
  private readonly SCOPES = "https://www.googleapis.com/auth/calendar";
  private readonly clientGapiConfig = {
    apiKey: config.GOOGLE_API_KEY,
    discoveryDocs: this.DISCOVERY_DOCS,
    scope: this.SCOPES,
    cookie_policy: "single_host_origin",
  };

  constructor(onSuccess?: (...args: any[]) => void) {
    this.onInitSuccess = onSuccess;
  }

  public init = async (): Promise<void> => {
    const response = await this.promisifyGAPILoad();
    console.log(response);
  };

  protected initGoogleClient = async (): Promise<void> => {
    try {
      console.log("start load client");
      await gapi.client.init(this.clientGapiConfig);
      this._onInitSuccess();
      GoogleApi.isGoogleAPIConfigured = true;
    } catch (err) {
      this.onError(err);
    }
  };

  private promisifyGAPILoad = (): Promise<unknown> =>
    new Promise<string>((resolve) => {
      gapi.load("client:auth2", () => {
        resolve("google client loaded successfully");
      });
    });

  private _onInitSuccess = (): void => {
    console.log("google API configured successfully !");
    if (this.onInitSuccess) {
      this.onInitSuccess();
    }
  };

  private onError = (error: Error): void => {
    console.error("google API executed with error", error);
  };
}
