# Responsibilities

- Track what to present as the principal for the session.
- Track what token to present to server when requesting restricted resources.
- Track whether or not the client has requested a token from the server to establish initial set of credentials.
- Track whether the user has been authenticated against an account; this tells us whether the user can login/logout.
- Use Local storage to persist the token across browser sessions and restarts.
- (maybe) Refresh tokens that are about to expire.

Currently, this service also pays attention to what badges are available, but this is likely to move to another service.
