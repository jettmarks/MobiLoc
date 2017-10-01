import {Injectable} from "@angular/core";
import {JwtHelper} from "angular2-jwt";
import {Storage} from "@ionic/storage";
/**
 * Created by jett on 7/30/17.
 * Provides local storage for Credentials.
 * If unset, will return "GuestToken".
 */
@Injectable()
export class Creds {
  TOKEN_KEY: string = "token.key";
  PRINCIPAL_KEY: string = "principal.key";
  private hasAuthToken: boolean = false;
  private jwtHelper: JwtHelper;
  payload;
  token: string;

  constructor(
    private storage: Storage
  ) {
    this.jwtHelper = new JwtHelper();
    this.loadToken();
  }

  public loadToken() {
    return this.storage.get(this.TOKEN_KEY).then(
      (token) => {
        this.updateToken(token);
      }
    );
  }

  private updateToken(token: string) {
    this.token = token;
    if(token) {
      console.log("Token Retrieved and cached");
      return this.cacheToken(token);
    } else {
      console.log("Token not found");
      this.hasAuthToken = false;
      this.payload = {
        badges: [],
        guest: true,
        email: "guest.dummy@clueride.com"
      };
      return this.payload;
    }
  }

  private cacheToken(authToken: string) {
    this.token = authToken;
    this.payload = this.decodePayload(authToken);
    /* if decodePayload doesn't throw any errors, we can assume it has found a valid token. */
    this.hasAuthToken = true;
    return this.payload;
  }

  /**
   * Immediately (synchronously) verify we can parse the token and asynchronously persist the token.
   * @param authToken
   * @returns {Promise<any>}
   */
  public setAuthToken(authToken: string) {
    this.cacheToken(authToken);
    return this.storage.set(this.TOKEN_KEY, authToken);
  }

  /**
   * Retrieves the token to be presented whenever restricted resources are requested.
   * @returns {string}
   */
  public getBearerToken(): string {
    return this.token;
  }

  public getPrincipalName(): string {
    return this.payload.email;
  }

  private decodePayload(fullToken: string): any {
    if (!fullToken) {
      throw new Error("passed token is not populated");
    }
    let parts = fullToken.split('.');
    if (parts.length !== 3) {
      throw new Error('JWT must have 3 parts');
    }
    let decoded = this.jwtHelper.urlBase64Decode(parts[0]);
    if (!decoded) {
      throw new Error('Cannot decode the token');
    }
    return JSON.parse(decoded);
  }

  public getBadges() {
    return this.payload.badges;
  }

  public isGuest() {
    return (this.payload.guest);
  }

  /**
   * Removes all credential information from the Store.
   * @returns {Promise<null>}
   */
  public clear() {
    return (this.storage.clear());
  }

  /**
   * If we're setup as a guest, then no, the user is not logged in and should be able to do so.
   * @returns {boolean}
   */
  public isLoggedIn() {
    return !this.payload.guest;
  }

  public hasToken() {
    return this.hasAuthToken;
  }

  /**
   * Ends the session by providing empty token -- as if the app is started the first time.
   */
  public logout() {
    this.hasAuthToken = false;
    this.updateToken(null);
    return this.storage.remove(this.TOKEN_KEY);
  }

}
