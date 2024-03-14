/// <reference types = "cypress" /> 

import { onlineShopPage } from "../../../support/pageObjects/online-shop"
import { checkOutPage } from "../../../support/pageObjects/checkOut"

const directorioName = __dirname.replaceAll('\\', '/');
const module = directorioName.split(/[/]/)[2]
const scenarioName = directorioName.slice(directorioName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const testCaseId = directorioName.split(/[-]/).pop();


describe(`${scenarioName} - ${module} `, () => {
    //API
    //1.Ingresar en pushing IT
    beforeEach(()=> {
        cy.login(Cypress.env().usuario, Cypress.env().password)
        cy.visit('');
    });

    it(`${module} - API`, () => {
        cy.fixture(`${module}/${scenarioName}-${testCaseId}/fixture`).then((data) => {
            //API
            //1.Ingresar en pushing IT
            //2. Crear 2 productos (primero verificar si existen y eliminarlos)
            cy.eliminarProductId(data.products.product1.id);
            //4.Crear el producto
             cy.crearProducto(data.products.product1);

            cy.eliminarProductId(data.products.product2.id);
            //4.Crear el producto
            cy.crearProducto(data.products.product2);

        });
    });

    it(`${module} - FE`, () => {
        
        cy.fixture(`${module}/${scenarioName}-${testCaseId}/fixture`).then((data) => {
            //FE
            //1.Visitar la pagina
            //2.Dirigirse al online Shop
            onlineShopPage.homePageOnline();
            //3.Agregar ambos productos al carrito de compra con al menos 2 cantidades cada uno
            onlineShopPage.selectByID();
            onlineShopPage.searchProduct(data.products.product1.id);
            cy.get(`[id="add-to-cart-${data.products.product1.id}"]`).click();
            cy.get("[id='closeModal']").click()
            //3.Agregar ambos productos al carrito de compra con al menos 2 cantidades cada uno
            onlineShopPage.selectByID();
            onlineShopPage.searchProduct(data.products.product2.id);
            cy.get(`[id="add-to-cart-${data.products.product2.id}"]`).click();
            cy.get("[id='closeModal']").click()

             //4.Dirigirse al carrito de compras
            cy.get("[id='goShoppingCart']").click();
            //5.Dirigirse al checkout
            checkOutPage.gotocheckout();
            //6.Realizar la compra
            checkOutPage.fillName(data.cliente.name);
            checkOutPage.fillLastName(data.cliente.last);
            checkOutPage.fillCard(data.cliente.card);
            checkOutPage.purchase();
            cy.wait(5000)
            cy.get("[id='sellId']").invoke('text').then((text) => {
                const sellid = text.trim();
            
                // Ejecuta la consulta SQL para obtener los datos de la base de datos
                const query = `SELECT distinct(s.id) FROM public.sells s inner join public."purchaseProducts" pp on s.id =pp.sell_id where s.id = '${text}'`;
            
                cy.task('connectDB', query).then((results) => {
                    // Extrae los IDs de los resultados de la consulta SQL
                    const ids = results.map(result => result.id.toString());
            
                    // Compara los IDs extraídos con el ID capturado
                    expect(ids).to.include(sellid);
                });
            });
            //SQL
            //Verificar la orden de compra que se registro en la basde de datos SQL (Realizar un join
            //para verificar ambas tablas ‘purchaseProduct’ y ‘sells’ / el id que comparten ambas
            //tablas es el de sells)
            


        });
    });


   
  


});


