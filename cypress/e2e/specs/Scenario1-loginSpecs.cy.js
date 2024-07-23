// import LoginPage from '../pageObjects/LoginPage';

import LoginPage from "../pageObjects/loginPage";

describe('User Login', () => {
  const loginPage = new LoginPage()

  beforeEach(() => {
    loginPage.visit();
    cy.wait(5000);
    loginPage.acceptCookies();

  });

  it('Valid Credentials', () => {
    cy.fixture('loginData').then((data) => {
      data.validUsers.forEach((user) => {
        
        loginPage.login(user.username, user.password);
        cy.url().should('not.include', '/login').and('include','all/now'); // Adjust the URL check as needed
        loginPage.logOut(); // Ensure you log out to reset the state
        loginPage.visit(); // Visit the login page again for the next test case
      });
    });
  });

  it('Invalid Credentials', () => {
    cy.fixture('loginData').then((data) => {
      data.invalidUsers.forEach((user) => {
        loginPage.acceptCookies();
        loginPage.login(user.username, user.password);
        loginPage.getErrorMessage().should('be.visible').and('contain', `We didn't recognize the username or password you entered. Please try again or click here to reset your password.`); // Adjust the error message check as needed
      });
    });
  });
});