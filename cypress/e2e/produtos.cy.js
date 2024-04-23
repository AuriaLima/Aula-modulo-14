/// <reference types= "cypress"/>

describe('Teste de API em produtos', () => {

    let token
    beforeEach(() => {
        cy.token('auria.limabs@gmail.com', 'teste').then(tkn => {
            token = tkn
        })
    });
    it('Deve Listar produtos com sucesso - GET', () => {
        cy.request({
            method: 'GET',
            url: 'produtos'
        }).should((response) => {
            expect(response.status).equal(200)
            expect(response.body).to.have.property('produtos')
        })
    });

    it('Deve Cadastrar produto com sucesso - POST', () => {
        let produto = 'Produto EBA' + Math.floor(Math.random() * 1000000000)
        cy.cadastrarProduto(token, produto, '10', 'Cabo USB C', 100)
            .should((response) => {
                expect(response.status).equal(201)
                expect(response.body.message).equal('Cadastro realizado com sucesso')
            })
    });

    it('Deve validar mensagem de produto cadastrado anteriormente- Post', () => {
        cy.cadastrarProduto(token, 'Cabo USB 001', 10, 'Cabo USB C', 100)
            .should((response) => {
                expect(response.status).equal(400)
                expect(response.body.message).equal('Já existe produto com esse nome')
            })
    })

    it('Deve editar um produto com sucesso - Put', () => {
        let produto = 'Produto EBAc editado' + Math.floor(Math.random() * 1000000000)
        cy.cadastrarProduto(token, produto, '10', 'produto ebac editado', 100)
            .then(response => {
                let id = response.body._id
                cy.request({
                    method: 'put',
                    url: `produtos/${id}`,
                    headers: { authorization: token },
                    body: {
                        "nome": produto,
                        "preco": 500,
                        "descricao": "produto editado",
                        "quantidade": 100
                    }
                }).should(response => {
                    expect(response.body.message).to.equal('Registro alterado com sucesso')
                    expect(response.status).to.equal(200)
                })
            })

    });

    it('Deve deletar um produto com sucesso - Delete', () => {
        cy.cadastrarProduto(token, 'Produto Ebac a ser deletado.', 100, 'Delete', 50)
            .then(response => {
                let id = response.body_id
                cy.request({
                    method: 'DELETE',
                    url: `produtos/${id}`,
                    headers: { authorization: token }
                }).should(resp => {
                    expect(resp.body.message).to.equal('Nenhum registro excluído')
                    expect(resp.status).to.equal(200)
                })
            })
    })
})