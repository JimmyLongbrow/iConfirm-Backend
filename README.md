# iConfirm-Backend
Version 1.0.1 - Thu 23 Dec 2020

by Nemo Petrovic & Jamil Samarani

Backend Location: https://github.com/JimmyLongbrow/iConfirm-Backend

Frontend Location : https://github.com/jamsec12ty/iconfirm-frontend

# Introduction
iConfirm is a MERN with Mongoose/GraphQL/Apollo Full-Stack Rostering App that allows Business Managers to Roster their staff accordingly. Once the roster is completed the Business Manager can push sms notification to the Employee via Twilio and request the shift to be confirmed or declined. Depending on the reply of the Employee , the shift will appear Green(confirmed), Red (declined) or Neutral ( to be confirmed ).

iConfirm: Rostering App

# Installation and Requirements
TBA, currently fixing a few bugs before Heroku Deployment.


# Project Description
The Project consists of 8 main sections;

1. Login or Register a Business Page.

2. Create one or Multiple Rosters (ie. Cleaning Roster, Bar Roster, Security Roster).

3. Add your Employee Details.

4. Click on the Date of the Shift using our iRoster Calendar.

5. Click and drag on the timeslot of the timesheet you wanted to fill.

6. Add your Employees name to the Shift.

7. Hop on to Agenda to see the created Shifts. And hit send shift when you are ready.

8. When Employee replies you will be notitifed if the shift is confirmed. If the shift is declined or the Employee is taking too long to reply you can edit the Shift and replace employee.

# Bugs
To file bug reports or feature requests please send email to: nemo@iconfirm.com.

# Version History
1.0.1 (23 Jul 2020):

-Fix Shifts CRUD

-Fix Venue Update and Routing

-Fix Login Email Verification

-Connect associations with Twilio Employee response and Shift status.

-Deploy to Heroku

# Donations
Donations to support Markdown's development are happily accepted. See: https://github.com/JimmyLongbrow for details.

# Copyright and License
Copyright (c) 2020 Nemo Petrovic
https://github.com/JimmyLongbrow/
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

Neither the name "iConfirm" nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

This software is provided by the copyright holders and contributors "as is" and any express or implied warranties, including, but not limited to, the implied warranties of merchantability and fitness for a particular purpose are disclaimed. In no event shall the copyright owner or contributors be liable for any direct, indirect, incidental, special, exemplary, or consequential damages (including, but not limited to, procurement of substitute goods or services; loss of use, data, or profits; or business interruption) however caused and on any theory of liability, whether in contract, strict liability, or tort (including negligence or otherwise) arising in any way out of the use of this software, even if advised of the possibility of such damage.


-------------------------------------------------------------------------------------------------------------------------------------------------------------------


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
