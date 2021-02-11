# Changelog

All notable changes to this project will be documented in this file. 

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]


## [0.7.4] - 2021-02-10

### Added

- Added more descriptive help text to data entry.
- Nests are colored by feature properties
  - On the Map page:
    - burrow      = blue
    - cavity      = purple
    - scrape      = green
    - stick nest  = orange
    - other/blank = grey
  - On Nest page:
    - current  = blue
    - historic = green
    - nearby   = grey

## [0.7.3] - 2021-02-09

### Changed
- Added `isDev` prop to show hide things that only need to be seen in development.

## [0.7.2] - 2021-02-09

### Fixed
- Nearby Nest table links to the referenced nest
- Textarea component uses the `value` prop for `v-model`. It is now reactive when `value` is not empty
- `api.submitNestVisit` is passed `requestBody` instead of `reqBody`, caused an error before

### Changed
- `rounded-lg` changed to `rounded`

## [0.7.1] - 2021-02-08

### Added
- HTTP response error handled when trying to add nest visit
- "gound - unspecified" added to options for survey type
- Location workflow is changed:
  - when entering a new nest the location.current_location is set to TRUE. It will always be true in this case.
  - When adding a new nest visit users have the choice to either update the nest location (location form shows up) or enter a new visit at the same location

### Changed
- Update error message for required "Is nest occupied" question
- `POST /nest/:id/visits` instead of `POST /nests/:id/new` to add new nest visit
- `LocationDetails.vue` form has new prop `currentLocation` to deal with changes to the location workflow

## [0.7.0] - 2021-02-08

### Added
- Nest Visits table to `/nests/:id`, the view nest by ID, page
  - One row for each visit to the nest with: Visit Date, Species, Observers, Occupied, options button as the columns
  - The table is mobile friendly. Observers, Occupied column will be removed from the table on smaller screens
  - Clicking the `...` button will expand the row to show all the data for a nest visit. 
    - Clicking the same button again will close the nest details

### Changed
- Default basemap is from road map to ESRI topo map
- Change `>` to `>=` for adult and production clarification field options
- Spelling: grounde to ground
- Help text for the "Nest Size" question in the form is more descriptive.
- "Exact Coordinates" question and data types:
  - Changed the data type to a string instead of boolean
  - Changed the date entry field type to a select instead of a radio
  - Help text changes
- Map slide over data fields to include "Last Visit", "Last Occupied", "Last Occupied Species"

### Fixed
- Agency dropdown wasn't showing up in the form. Now it does.

## [0.6.1] - 2021-02-04

### Fixed
- Nest ID wasn't reactive in the header of `/nests/:id` page. It was hardcoded as ABC1234. It is now reactive
- 

## [0.6.0] - 2021-02-04

### Added
- Edit nest details 

### Changed
- Form field updates requested by diversity staff
  - dropdown for Agency
  - qualify adult and production counts
- `/nests/:id` layout redesign for better visualization of nest data
  - embedded within `/nest/:id` shows up after click on "Edit Nest" button

## [0.5.0] - 2021-01-04

### Added
- `nests/:id` view. Includes data about the nest, all nest visits, nearby nests. Links out to additional nest pages.
- `nests/:id` slide over for new nest visit data entry
  - takes response from the API and pushes it to the `nests.nest_visits` array to avoid page refresh
- `nests/new` has data entry and validation for entering a nest visit.
- Scroll to top of forms when there are form errors
- Link to create new nest in `PageHeader.vue`, doesn't show on `/nests/new` route
- Set map bounds in `create` hook on `/nests/:id` page

### Fixed
- Use `:key` to `<router-view>` to properly change pages when using

## [0.4.0] - 2021-01-03

### Added
- Zoom to utm coordinates on main map
- Feature marker is draggable on the main map
- Uses raptor nest API now (not just json-server mock API)
- Loads nests from API as a geobuffer and parses to GeoJSON for display
- Base radio input component

### Fixed
- Scrollbar on `/nests/new` is aligned to the left now
- Locations details accepts `v-model` so it is reactive to marker drag in
  the map input component

### Changed
- Refactor base inputs to be more reusable, robust
- Use preferCanvas on leaflet map to help with performance

### Removed
- Deleted unused componentes

## [0.3.1] - 2020-12-11

Most of the work here was to work on deployment to DigitalOcean Apps platform.

### Added
- CHANGELOG.md
- .env files for build
- `json-server.sh` to start `json-server` with pm2
- `ecosystem.config.js` to run with one command for others

### Fixed
- moved some dependencies to to development in `package.json`
- Updated TailwindCSS based on some tweets form Adam Wathan. Essential
the initial 2.0.0 release with PurgeCSS 7 compatibility had some issues. These
issues showed up when attempting to deploy to DigitalOcean.

## [0.3.0] - 2020-12-09

### Added

- Lazy load routes within vue router
- Add a nest to location workflow `c9ce5cc55c3a1b22f358987f5471ca52c58cb92e`
  - From `/` add a marker to the map, open marker popup, click "Add Nest to This Location"
  button, opens `/nests/new` with the map input set to the location of the marker on `/`
- Geolocation to `/`
- HTTP requests to `json-server` to submit nests, fetch nests in new format
- Data Entry sidebar nav route

### Changed 

- Add nest links point to `/nests/new`

