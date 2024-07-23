class LoginPage {
    visit() {
      cy.visit('/login'); // Adjust the URL to your login page
    }

    acceptCookies() {
        cy.get('body').then((body) => {
          if (body.find('button#onetrust-accept-btn-handler').length > 0) {
            cy.get('#onetrust-accept-btn-handler').click();
          }
        });
      }

    fillUsername(username) {
      cy.get(`input[data-testid='login-email']`).type(username,{force:true}); // Adjust the selector
    }
  
    fillPassword(password) {
      cy.get(`input[data-testid='login-passwordInput']`).type(password,{force:true}); // Adjust the selector
    }
  
    submit() {
      cy.get(`button[data-testid='login-submitBtn']`).click({force:true}); // Adjust the selector
    }
  
    login(username, password) {
      this.fillUsername(username);
      this.fillPassword(password);
      this.submit();
    }


    clickThanksButton(){
        cy.get(`div.pendo-mock-flexbox-element button`).click();
    }

    logOut(){
        cy.get(`div[data-testid='myAccount-dropdownWrapper'] span[data-testid='icon-wrapper'][data-icon='sort-down']`).click({force:true});
        cy.get(`a#header-logout-link`).should(`exist`).and(`be.visible`).click();
    }
  
    getErrorMessage() {
      return cy.get(`p[data-testid='login-errorMessage']`); // Adjust the selector
    }
  }
  
  export default LoginPage;