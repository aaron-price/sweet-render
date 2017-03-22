# Change Log

## Versions
This uses semantic versioning
## [1.2.0]
## Added
Support for React.
Greatly simplified the API endpoints, getting rid of all nested objects.
Enabled syntax presets
Changed the default syntax to a minimalist one - see docs for details

## Breaking changes
The API endpoints are different now. For example: 
Old:
config = {tags: {element: {open: ""}}} 

New:
config = {elementTagOpen: ""}

## Fixed
Issue with lists as the first element. see https://github.com/aaron-price/sweet-render/issues/8

## [1.1.0]
## Added
Support for input Arrays.

## [1.0.3]
## Changed
- Package main file now uses the minimized version.
- Updated README with usage for es6, non-es6, node, and browser.

## [1.0.2]
## Changed
- Webpack's output library name from "sweet-render" to "sweetRender". 

## Fixed
- Due to the name change, package now works better in UMD implementations.