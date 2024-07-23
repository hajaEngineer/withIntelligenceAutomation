class DashboardPage {
    visit() {
      cy.visit('/all/now'); // Adjust the URL to your login page
    }

    clickOnstartFollowingOnButon(){
      cy.get(`div[class^='ArticleListingstyled__WatchListCardWrapper'] button`).contains('Start following',{matchCase:false}).click();
    }

  
    watchListModal(){
        return cy.get(`div[role='dialog'] h5`);
    } 

    clickOnCrossButton(){
      cy.get(`div[role='dialog'] span[data-testid='icon-wrapper']`).click();
    }

    clickOnTopMenuLink(menuName){
      cy.get(`div[class^='Navigationstyled__Menu'] a`).contains(menuName).click();
    }


    clickOnAllocateWithMenu(menuName){
      cy.get(`div[id*='downshift'][id*='button'][aria-haspopup='listbox']`).click();
      cy.get(`div[role='option']`).contains(menuName,{matchCase:false}).should('be.visible').click();
    }

    enterSearchText(searchText){
      cy.get(`input[data-testid='globalSearch-input']`).type(searchText);
    }

    displayingResultText(){
      cy.wait(2000);
      return cy.get(`div[data-testid='tabsHandlers-tabPanel-nowResults']>span`);
    } 

    searchList(){
      return cy.get(`div[data-testid='tabsHandlers-tabPanel-nowResults'] a`);
    }

    nosearchResultText(){
      return cy.get(`p[class*='NotFoundstyled__Text']`).contains(`did not match any documents.`,{matchCase:false});
    }

  } 
  
  export default DashboardPage;