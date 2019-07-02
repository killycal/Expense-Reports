Receipt Genius Writeup


Overview:

The webpage made is very close to what’s described in the requirements. It pulls in the files from the json in the local files through a get request. The vendor, date, price, category, description, and img type are compiled into a list of components called Receipts. The total value of all the receipts is displayed. If a mouse hovers over one of the receipts, a trash can appears in the top right of the component that, if clicked, will delete the item from the list and subtract the dollar value from the total displayed. If Add receipt is pressed, a Modal is opened which contains a form that takes the users input. This form has validation on all the required fields except for the file, which I was not able to implement due to time constraints. Once the user presses submit and all fields pass validation, a new item is added to the end of the receipt list. If the user hits the x at the top right or cancel, nothing will be added and the Modal will be closed. Screenshots of the two windows below.



Bugs/shortcomings/future work:


There’s a few formatting errors such as unoptimized space in the receipt components, such as:
description and titles not optimally using the space if the values are too long. 
The trash can also has too much white space to the right of it which is also unoptimized space. 
The category tag background stretches too far if the title of the receipt is long.
I used radio buttons instead of fancier looking buttons as illustrated in the mockup. I was running short on time and knew for sure how to implement radio buttons so I avoided another option
The date for new entries is in a different format than the ones originally taken from the json
Receipt total in the add receipt form doesn’t automatically format into dollars until it’s submitted
Description should probably have a smaller font size on input

Receipt file isn’t a required field by validation. I was using a type of file input system that I wasn’t sure how to integrate with the form validation I was using. It isn’t too much of a problem for now, because if a file isn’t uploaded the only difference is that by default, the generic .img is displayed instead of the one for .pdf.
All testing was done by myself and a few friends manually, and I was not able to incorporate unit testing due to time constraints.
In the future, the page should probably display the actual image of the receipt if the component is clicked.
If this is to be an external website, I would need to have it running on a server- but for our purposes now, I’ll just rely on it being on a local machine.

3rd Party Assets Used


I used a library called react-bootstrap that is used for quick style templates such as Button, Modal, Form etc. This link has more documentation: https://react-bootstrap.netlify.com/
Axios was used to pull in the json via a get request. This link has more documentation: https://github.com/axios/axios
I used something called FlexView from react-flexview. It handles the collection of receipts and the formatting of them as a collective. 
Documentation: https://github.com/buildo/react-flexview
To browse for files, I used a component called Files from a library called react-files. Documentation:https://www.npmjs.com/package/react-files
Of course, fontawesome icons were used per the requirements. None of the names given in the mockup matched the look, so I chose to pick the one that matched the appearance more than the name. The font muli wasn’t used because I just realized that was supposed to be used while I’m making this writeup, and don’t have time to implement the special font.



Deployment

In order to run the web page with the files included, you first need to extract the files to a place on your computer. Open the command window and cd to the location of the build folder on your computer. 
Once in the build folder, type: serve -s build
If there are no problems, the page should be displayed, by default, at http://localhost:5000
The page works a little bit better on firefox than other browsers :)


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.



### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
