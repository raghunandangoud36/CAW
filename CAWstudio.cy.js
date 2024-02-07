describe('Test', ()=>{

    it('HomeTest', ()=>{
        // Visit the specified URL
        cy.visit("https://testpages.herokuapp.com/styled/tag/dynamic-table.html")

        // Click on the summary element
        cy.get("summary").should('be.visible').click()

        // Clear the contents of the #jsondata element   
        cy.get("#jsondata").clear()

        // Wait for 5 seconds to view for us
        cy.wait(5000)

        // Define JSON data to be entered into the #jsondata element that given acc to the ass
        const jsonData=[
            
                        {"name" : "Bob", "age" : 20, "gender": "male"}, 
                        {"name": "George", "age" : 42, "gender": "male"},
                        {"name": "Sara", "age" : 42, "gender": "female"}, 
                        {"name": "Conor", "age" : 40, "gender": "male"}, 
                        {"name": "Jennifer", "age" : 42, "gender": "female"}]

        cy.get("#jsondata").type(JSON.stringify(jsonData), {parseSpecialCharSequences: false })

        cy.wait(5000)

        // Click on the #refreshtable element
        cy.get("#refreshtable").click()

        cy.wait(5000)

        // to check weather equal no of lenght or not
        cy.get("#dynamictable tr:nth-child(n+3)").then(($rows)=>{
            expect($rows).to.have.length(jsonData.length)

            //iteate over each row in the table
            cy.get("#dynamictable tr:nth-child(n+3)").each(($row, index)=>{
                const actualData=$row.find('td').map((_, cell)=> Cypress.$(cell).text())
                const expectedData = Object.values(jsonData[index]).map(jsonData)
                expect(actualData).to.equal(expectedData)
            })   

             ;
        })


    })
})