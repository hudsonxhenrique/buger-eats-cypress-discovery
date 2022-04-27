import signup from '../pages/SignupPage'
import signupFactory from '../factories/SignupFactory'


describe('Signup', () => {

    // before(function(){
    //     cy.log('Tudo aqui é executado uma única vez ANTES de TODOS os casos de testes')
    // })

    beforeEach(function () {
        cy.fixture('deliver').then((d) => {
            this.deliver = d
        })
    })

    // after(function(){
    //     cy.log('Tudo aqui é executado uma única vez DEPOIS de TODOS os casos de testes')
    // })

    // afterEach(function(){
    //     cy.log('Tudo aqui é executado sempre DEPOIS de CADA caso de teste')
    // })

    it('User should be deliver', function () {

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        var deliver = signupFactory.deliver()

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.modalContentShouldBe(expectedMessage)
    })

    it('Incorrect document', function () {

        var expectedMessage = 'Oops! CPF inválido'
        var deliver = signupFactory.deliver()
        deliver.cpf = '000000000AA'

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alertMessageShouldBe(expectedMessage)
    })

    it('Incorrect email', function () {

        var expectedMessage = 'Oops! Email com formato inválido.'
        var deliver = signupFactory.deliver()
        deliver.email = 'hudson.com.br'

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alertMessageShouldBe(expectedMessage)
    })

    context('Required fields', function () {

        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'delivery_method', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' }
        ]

        before(function(){
            signup.go()
            signup.submit()
        })

        messages.forEach(function(msg){
            it(`${msg.field} is required`, function(){
                signup.alertMessageShouldBe(msg.output)
            })
        })

    })

    // it.only('Required fields', function () {
    //     signup.go()
    //     signup.submit()

    //     signup.alertMessageShouldBe('É necessário informar o nome')
    //     signup.alertMessageShouldBe('É necessário informar o CPF')
    //     signup.alertMessageShouldBe('É necessário informar o e-mail')
    //     signup.alertMessageShouldBe('É necessário informar o CEP')
    //     signup.alertMessageShouldBe('É necessário informar o número do endereço')
    //     signup.alertMessageShouldBe('Selecione o método de entrega')
    //     signup.alertMessageShouldBe('Adicione uma foto da sua CNH')
    // })
})