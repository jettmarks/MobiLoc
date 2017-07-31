/**
 * Created by jett on 7/30/17.
 */
export class Creds {
  /* The token to be passed as part of the Authorization header. */
  static bearerToken: string = "GuestToken";

  public static setAuthToken(authToken: string) {
    this.bearerToken = authToken;
  }

  public static getBearerToken(): string {
    return this.bearerToken;
  }

}
