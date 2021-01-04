# Changelog

All notable changes to this project will be documented in this file. 

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

