Technical information:

Please be aware that this suite is using the following tech stack:
NodeJS 16.14
Chai 4.3.6
WedriverIO 7.19.5 with:
wdIO Cucumber 7.19.5
wdIO Allure 7.19.5
Chromedriver 100.0.0


Scripting languages used:
Javascript ES6
Gherkin

In order to use allure you also need:
Java 8 or higher

For more information about modules and dependencies, please check package.json.

In order to run this suite, please follow the instructions below:
1) Install nodeJS 16.14
2) Clone the repo to your directory
3) Run ``npm install`` from root dir
4) To run the whole suite use ``npx wdio run wdio.conf.js``. In order to use different wdio config, please find the attached wdio.conf.js files and run ``npx wdio run yourConfig.conf.js``

Testing scope:
1) Feature 1 - Site sign in functionality (using testdata json)
2) Feature 2 - Site sign up functionality (using external email service provider, using fs to store temporary data and testdata json)
3) Feature 3 -
...


Project structure:
All features are placed in ``./features/`` directory and are given a set of test scenarios following BDD rules of Given, When, Then approach.
Step definitions are placed in the ``./features/step-definitions/`` directory.
Page Object Models are placed in the ``./features/pageobjects/`` directory.
Custom helper functions are placed in the ``./features/helpers/`` directory. 

More info to come, WIP.