
import DashboardPage from '../pageObjects/DashboardPage';
import LoginPage from '../pageObjects/loginPage';

describe('Search Functionality', () => {
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

  it('Valid Search Query', () => {
    dasboardPage.visit();
    dasboardPage.enterSearchText('Investors');
    dasboardPage.displayingResultText().should('be.visible').and('contain', 'Investors',{matchcase:false}).and('contain',`Displaying results for 'Investors'`,{matchcase:false});
    dasboardPage.searchList().should('have.length.greaterThan', 0); 
  });


  it('No Search Results', () => {
    dasboardPage.visit();
    dasboardPage.enterSearchText('abcdefghihgfedcba');
    dasboardPage.displayingResultText().should('be.visible').and('contain', 'abcdefghihgfedcba',{matchcase:false}).and('contain',`Displaying results for 'abcdefghihgfedcba'`,{matchcase:false});
    dasboardPage.nosearchResultText().should('be.visible').and('contain', 'Your search for').and('contain',`'abcdefghihgfedcba' did not match any documents.`);
  });
  
});