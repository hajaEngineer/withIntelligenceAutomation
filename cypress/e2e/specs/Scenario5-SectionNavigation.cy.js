
import DashboardPage from '../pageObjects/DashboardPage';
import LoginPage from '../pageObjects/loginPage';

describe('Section Navigation', () => {
  const loginPage = new LoginPage();
  const dasboardPage = new DashboardPage();


  beforeEach(() => {
    loginPage.visit();
    cy.wait(5000);
    loginPage.acceptCookies(); // Conditionally accept cookies if the button is present
    cy.fixture('loginData').then((data) => {
        data.validUsers.forEach((user) => {
            loginPage.login(user.username, user.password);
            cy.url().should('not.include', '/login').and('include','all/now');
        });
      });
  });

  afterEach(() => { 
    loginPage.logOut();
  });

  it('Test the switching between different sections on the platform', () => {
    dasboardPage.visit();
    dasboardPage.clickOnAllocateWithMenu(`Private Credit`);
    cy.url().should('include', 'pcfi/now');
  });
  
});