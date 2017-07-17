# Auth Mechanisms

Logging in establishes three things:
* A link between a user's credentials and their account within ClueRide
* A Session that expires after 12 hours
* A set of Badges that confer privileges

## Credentials
There are a few supported methods for establishing a user's credentials:
* Selected Social Media: Via OAuth, a user may use their credentials from 
another account to establish a new account within ClueRide.  Because the 
Social Media account may be able to supply email address and profile 
picture, this is often sufficient information to create a ClueRide account.
* Email and Password: User's whose account is already within ClueRide may 
setup a password that allows them to login directly to the game or other 
tools (such as MobiLoc). This method is also used if Social Media fails.
* Invitation: A user whose account is already within ClueRide is invited 
via email and a token to participate in a given outing. The token is 
presented when the game is opened, and this token provides the link back 
to the account information within ClueRide.

### Social Media Details
- Currently, Google accounts can be used (via access to the native API) 
to obtain OAuth credentials.
- ~~Would like to support the browser-based so testing using 'ionic serve' 
is possible while switching accounts. This method is attempted if the native 
API either fails or is unavailable.~~ No longer supported by Google as of 
April, 2017.
- Facebook can also be added -- both natively and via browser.

## Session
The chosen implementation establishes a JSESSIONID stored in cookies. This 
will need to be tested within the apps.

## Badges
_Longer discussion elsewhere._

The login API returns a list of Badges.  Currently, Badges are represented 
as a simple String, but more formally will be using the Open Badge 
specification for digitally signed "proof" of documented achievement (and 
for ClueRide, authorization of specific privileges).
