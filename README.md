# Project Title
Playwright API automation

## 📚 Project Description

This is a PoC for API test automation. The tests are written in Typescript and uses the [Playwright](https://playwright.dev/) testing framework. 

## 🔑 Key features
Some key features of the project are:
<br> ☀️ Scheduled to run on whenever there is push to main branch using Github actions
<br> ☀️ HTML reports showing the overall test results
<br> ☀️ Built-in retry capability in case of a test failure

## ⚙️ Installation

To get started with this project, you'll need to have Node.js and npm installed on your machine. Once you have those installed, you can clone this repository and run the following command to install the dependencies:

`npm install`

### Running the Tests
 To run the tests through CLI, use following commands:

```bash
## To run an individual test in chromer browser
npx playwright test tests

## To open an HTML report locally after all the tests have run
npx playwright show-report

```

## Configuration

The configuration for this project can be found in the playwright.config.ts file. You can customize the behavior of the tests by modifying the properties in this file.

## Writing Tests

Tests are located in the /tests directory. This project includes API tests. To write a new test, simply create a new file in the /tests directory and use the Playwright testing API to interact with your APIs.


## Contributors

☀️ [Dhanpal Panwar](https://github.com/DhanpalPanwar) <br>

If you want to contribute to the project then simply create a Pull Request and submit to for review. Before submitting a pull request, make sure to run the tests locally and ensure that they pass.
Once the Pull Request is approved then it can be merged to the main branch.<br>

If you have any questions or issues with this project, please reach out to the DhanpalPanwar.

😎😎😎
