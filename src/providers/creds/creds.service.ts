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
  jwtHelper: JwtHelper;
  principalName: string;
  badges: string[];
  token: string;

  constructor(
    private storage: Storage
  ) {
    this.jwtHelper = new JwtHelper();
    storage.get(this.TOKEN_KEY).then(
      (token) => {
        this.cacheToken(token);
      }
    );
  }

  private cacheToken(authToken: string) {
    let payload = this.decodePayload(authToken);
    this.token = authToken;
    this.principalName = payload.email;
    this.badges = payload.badges;
  }

  public setAuthToken(authToken: string) {
    console.log("Recording new Auth Token: " + authToken);
    this.cacheToken(authToken);
    this.storage.set(this.PRINCIPAL_KEY, this.principalName);
    this.storage.set(this.TOKEN_KEY, authToken);
  }

  public getBearerToken(): string {
    return this.token;
  }

  public getPrincipalName(): string {
    return this.principalName;
  }

  private decodePayload(fullToken: string): any {
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
    return this.badges;
  }
}
