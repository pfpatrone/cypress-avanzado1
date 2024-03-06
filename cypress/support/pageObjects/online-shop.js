class online_Shop {

    iniciarSesion() {
        cy.get("[id=registertoggle]").dblclick();
    }


    getUserNameInput()
    {
       return cy.get("[id='user']");
    }

   
    userName(text) {
        this.getUserNameInput().type(text);
    }

    getPassInput()
    {
       return cy.get("[id='pass']");
    }

    password(text) {
        this.getPassInput().type(text);
    }

    submitForm()
    {
        cy.get("[id=submitForm]").click();
    }
    
    validateLoginUser(text)
    {
        cy.get('.css-y5314g').should("contain", text);
    }

    homePageOnline()
    {
        cy.get("[data-cy='onlineshoplink']").click();
    }
    
    addProduct()
    {
        cy.get("[id='add-product']").click();
    }


    getProductNameInput(text)
    {
        return cy.get("[data-cy='productName']");
    }

    
    productName(text)
    {
        this.getProductNameInput().type(text);
    }


    getProductPrizeInput(text)
    {
        return cy.get("[data-cy='productPrice']");
    }

    
    productPrize(text)
    {
        this.getProductPrizeInput().type(text);
    }
    
    getProductUrlInput()
    {
        return cy.get("[id='productCard']");
    }

    productUrl(text)
    {
        this.getProductUrlInput().type(text);
    }

    getProductIdInput()
    {
        return cy.get("[id='productID']");;
    }

    productId(text)
    {
        this.getProductIdInput().type(text);
    }

    createProduct()
    {
        cy.get ("[id='createProduct']").click();
    }

    closeAlert()
    {
        cy.get("[data-cy='closeModal']").click()
    }
    
    selectByID()
    {
        cy.get("[id=search-type]").select('ID');
    }

    searchProduct(text)
    {
        cy.get("[data-cy='search-bar']").clear().type(`${text}{enter}`);
    }



    deleteProduct(text)
    {
        cy.get(`[id="delete-${text}"]`).click();
    }

    confirmDelete()
    {
        cy.get("[id='saveEdit']").click();
    }
    
    checkExistProduct(text)
    {
        cy.get("[role='group']").should("not.contain", text);
    }
    
    
}

export const onlineShopPage = new online_Shop();
