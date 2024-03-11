class checkOut {
    gotocheckout()
    {
        cy.get("[id='goCheckout']").click();
    }
    
    fillName(text)
    {
        cy.get("[id='FirstName']").type(text);
    }
    
    fillLastName(text)
    {
        cy.get("[id='lastName']").type(text);
        
    }

    fillCard(text)
    {
        cy.get("[id='cardNumber']").type(text);
        
    }

    purchase()
    {
        cy.get("[data-cy='purchase']").click();
        
    }

    checkPurchase()
    {
        cy.get("[data-cy='thankYou']");
    }
   

}

export const checkOutPage = new checkOut();