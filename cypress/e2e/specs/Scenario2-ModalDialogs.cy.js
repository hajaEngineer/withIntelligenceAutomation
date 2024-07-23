
import DashboardPage from '../pageObjects/DashboardPage';
import LoginPage from '../pageObjects/loginPage';

describe('Modal Dialogs', () => {
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

  it('Open a Modal', () => {
    dasboardPage.visit();
    dasboardPage.clickOnstartFollowingOnButon();
    dasboardPage.watchListModal().should('be.visible').and('contain', 'Watchlist',{matchcase:false});
    dasboardPage.clickOnCrossButton();
  });

  it('Close the modal', () => {
    dasboardPage.visit();
    dasboardPage.clickOnstartFollowingOnButon();
    dasboardPage.watchListModal().should('be.visible').and('contain', 'Watchlist',{matchcase:false});
    dasboardPage.clickOnCrossButton();
    dasboardPage.watchListModal().should('not.exist');
  });

  
});