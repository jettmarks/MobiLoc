import {SessionTokenService} from "../session-token/session-token.service";
import {Injectable} from "@angular/core";
/**
 * Created by jett on 9/24/17.
 */

@Injectable()
export class Resource {

  constructor(
    private sessionTokenService: SessionTokenService
  ) {
  }

  addTokenRequestInterceptor(configurer) {
    configurer.addFullRequestInterceptor(
      (element, operation, path, url, headers, params) => {
        let bearerToken = this.sessionTokenService.getBearerToken();

        return {
          headers: Object.assign({}, headers, {Authorization: `Bearer ${bearerToken}`})
        };
      }
    );
  }

  defineMethod(configurer, methodConfig) {
    this.addTokenRequestInterceptor(configurer);
    configurer.addElementTransformer(methodConfig.resourceName, true,
      (resource) => {
        resource.addRestangularMethod(
          methodConfig.name,
          methodConfig.httpMethod,
          methodConfig.path,
          methodConfig.object,
          methodConfig.headers
        );
        return resource;
      }
    );
  }

}

