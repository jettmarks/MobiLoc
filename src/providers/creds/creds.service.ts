/**
 * Created by jett on 7/30/17.
 * Provides local storage for Credentials.
 * If unset, will return "GuestToken".
 */
export class Creds {
  static TOKEN_KEY: string = "token.key";

  public static setAuthToken(authToken: string) {
    console.log("Recording new Auth Token: " + authToken);
    window.localStorage.setItem(Creds.TOKEN_KEY, authToken);
  }

  public static getBearerToken(): string {
    let bearerToken = window.localStorage.getItem(Creds.TOKEN_KEY);
    if (bearerToken && bearerToken.length > 0) {
      return bearerToken;
    } else {
      return "GuestToken";
    }
  }

}
