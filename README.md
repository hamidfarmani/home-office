# Home office

Welcome to our proximity visualization tool! This tool is designed to help users understand the proximity of their homes to their office by displaying a map with markers indicating the home locations. We have implemented several features to enhance the user experience and make the map more informative.

- Three circles are added to indicate proximity of home to office, each circle with different color represent 5km, 10km and 15km
- Random home locations are generated for proximity visualization
- Clustering algorithm is implemented to group nearby home locations for improving map readability
- A driving route from a clicked house to the office is added, along with a text description of the cost and duration of the trip

We hope that this tool will be helpful for you. In case of any issues or to request a new feature, please let us know. Happy mapping!

# Live version

You can check the live version of this project [here](https://hamid-home-office.netlify.app/).

# Installation

1. Clone this project locally
2. Run `yarn` in your terminal
3. Run `yarn start` in your terminal

# Dependencies

- [React](https://reactjs.org/) 18.2.0
- [Mantine](https://mantine.dev/) is the theming and styling library used in this project.
- [Google Maps API](https://developers.google.com/maps/) is the main API allows users to make routes and search for locations.
