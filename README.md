# Interactive Image Coordinate Finder

## Description
The **Interactive Map Coordinate Finder** is a web-based application that allows users to upload a map image, click on it to mark coordinates, and save specific coordinate layers with unique names and optional URLs. Users can also manage the saved layers by copying, editing, or deleting them as needed. This tool is especially useful for mapping or annotating regions on custom maps. 

## Table of Contents
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Screenshots](#screenshots)
- [Setup](#setup)
- [Usage](#usage)
- [Test Page Integration](#test-page-integration)
- [License](#license)
- [Contact](#contact)

## Technologies Used
- **HTML**: Structure of the page.
- **CSS**: Styling for layout, notifications, and layer management elements.
- **JavaScript**: Core functionality for map interactions, coordinate plotting, and layer management.
  
## Features
- **Image Upload**: Upload any image (e.g., a map) onto a canvas for interaction.
- **Coordinate Plotting**: Click on the map to record and display coordinates.
- **Layer Management**: Save coordinate sets as layers with names and optional URLs.
- **Dynamic HTML `<area>` Generation**: Generate HTML `<area>` elements for each saved layer, with coordinates and custom links.
- **Clipboard Integration**: Copy coordinates or HTML `<area>` elements to the clipboard.
- **Layer Log**: A log for tracking, editing, and deleting saved layers.

## Setup
1. Clone the repository.
   ```bash
   git clone https://github.com/your-username/coordinate-finder.git
   ```
2. Navigate to the project directory.
   ```bash
   cd coordinate-finder
   ```
3. Open index.html in your browser to use the application.

## Usage
1. Upload a Map Image: Click on the "Upload Map Image" button and select an image file.
2. Plot Coordinates: Click on the map to mark locations; coordinates will appear in the "Coordinates Output" section.
3. Save Layer: Enter a layer name, optionally add a URL, and click "Save Layer" to log the coordinates as a layer. Remember your layers will disappear if you refresh or reload the page!
4. Copy or Edit Layers: Use the controls in the "Layers Log" to copy coordinates or HTML code for each layer, or edit and delete layers as needed.

## Test Page Integration
Inside the testing folder is a simple web page for you to test the app on. 

1. in the IMG folder you'll find a map of the middle east, save it locally.
2. Open up the tool and load the image in, the image is already placed in the testPage.html
3. Name the country you want to outline, optionally give it a URL where you want the users to go on click. If left blank it will replace the link with #. 
4. Click around the border with as much precision as you'd like to generate the coordinates.
5. Save the Layer. Remember your layers will disappear if you refresh or reload the page!
6. Click the copy code button and paste it into the testPage.html under the comment that says ```<!-- Add <area> elements below -->``` 
7. Save and refresh your page. The area you outlined should no be a clickable area!

## License
This project is licensed under the MIT License.

## Contact
For any questions or suggestions, please visit: https://dot.cards/ryanverwey
