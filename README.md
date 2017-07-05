# MobiLoc
____Location Editor for Clue Ride____

_See the CONTRIBUTING.md for building and contributing to this app._

# Features
This application is used to maintain Places, Attractions, and Features for the Clue Ride Game.
Places, Attractions and Features are collectively called "Locations" with increasing level of detail:

|Level Usage |Level Name |Requirement |Ranking Factors|Map Icon Color |
|------------|-----------|------------|---------------|---------------|
| Utility | Node | Lat/Lon so it can be part of geometry | Ease of Access (based on connecting routes) | none |
| Work-in-Progress | Draft | One or more requirements from higher levels; not yet adding up to Place | Completeness | Orange |
| Map-worthy | Place | Name; Type (allowing Icon); On network; Featured Image; Description | - | Green |
| Course-worthy | Attraction | Set of Clues | Depth of Clues;  Set of Courses | Blue |
| Features | Featured Destination | Google Place | Multiple, see Strength Factor list below | Purple |

Locations start as a Node and move to Draft as data is added to the location. 
Once a certain level of details has been added, the Location progresses to the next level.

## Strength factors
* Links to further info regarding place
* Proximity to other locations with high scores
* Rankings 
* Popularity (number of visits; visitors; views)
* Establishment documented for the location
* Future: Label Scores; ranking within categories

# Who can use this App

All users can review the state of locations within Clue Ride to submit requests, 
and users who have attained the Steward Badge will be allowed full edit privileges.

## Requests available to all users

* New Location - Capture the Lat/Lon for creation of a Node; whether on or off the network.
* Report problems - Incorrect or out-of-date data, safety issues and hazards noted.
* Suggest Clues for existing locations (or requested locations at the Node or Draft level).

All other updates would be accepted provisionally. Once added by a Badged user, they become part of the Game.

## Edits available to Stewards

Again, submissions from "Stewards-in-training" are accepted provisionally.

Screens are provided to allow entering or updating each of these fields.
* Name
* Description
* Featured Image
* Other Images
* Location Type (see below)
* List of Clues (at least one)
* Google Place (if one is defined)
* Establishment (if any, may be a Google Place as well)

