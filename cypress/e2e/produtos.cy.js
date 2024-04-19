/// <reference types= "cypress"/>

describe('Teste de API em produtos', () => {

    let token
    beforeEach(() => {
        cy.token('auria.limabs@gmail.com', 'teste').then(tkn => {
            token = tkn
        })
    });
    it('Listar produtos - GET', () => {
        cy.request({
            method: 'GET',
            url: 'produtos'
        }).should((response) => {
            expect(response.status).equal(200)
            expect(response.body).to.have.property('produtos')
        })
    });

    it('Cadastrar produto - POST', () => {
        let produto = 'Produto EBA' + Math.floor(Math.random() * 1000000000)
        cy.request({
            method: 'POST',
            url: 'produtos',
            headers: { authorization: token },
            body: {
                "nome": produto,
                "preco": 11,
                "descricao": "Cabo UBS tipo cdl",
                "quantidade": 40
            }
        }).should((response) => {
            expect(response.status).equal(201)
            expect(response.body.message).equal('Cadastro realizado com sucesso')
        })
    })

});