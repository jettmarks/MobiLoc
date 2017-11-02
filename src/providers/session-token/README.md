# Responsibilities

There are too many within this service.  May want to focus on splitting these out.

## Presentation responsibilities
- Provide Principal and Name
- Provide isGuest Status
- Provide isLoggedIn Status

## Token management
- Prepare cached copy -- either from storage or from the service
- Provide token for session (Auth's "Bearer Token")
- Add new Token from service

When logging out, we'll want to set state, and also to clear the token as appropriate.  This may still be ambiguous as
to whether we want to track/browse anonymously, or if we're indicating we're on a shared device and no longer want this
device to recognize our presence.  (Similar to the "remember me on this machine")

### Original set

- Track what to present as the principal for the session.
- Track what token to present to server when requesting restricted resources.
- Track whether or not the client has requested a token from the server to establish initial set of credentials.
- Track whether the user has been authenticated against an account; this tells us whether the user can login/logout.
- Use Local storage to persist the token across browser sessions and restarts.
- (maybe) Refresh tokens that are about to expire.

Currently, this service also pays attention to what badges are available, but this is likely to move to another service.

# Additional Detail on responsibilities
 
## Presentation of Principal
`getPrincipalName(): string`
- When not logged in or otherwise identified to the system, a guest ID and token
are provided to the session and stored on the device.  The Principal in that case will
have been created and managed by the server. This principal is not provided to
the user because it isn't a valid email *account*, just a valid *address*.
- Once the user identifies their account with an external login with a
verifiable email address, this becomes the principal. It is part of the token that 
identifies an open session.

## Presentation of token
`getBearerToken(): string`
- Follows the same logic as the Principal except the Principal is wrapped within
a token.

## Login State
- No Session - not logged in
- Guest Session - not logged in, but can browse around with limited functionality.
- Authenticated Session - logged in with privileges based on badges.
