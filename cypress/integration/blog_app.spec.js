const { _, $ } = Cypress
describe('Blog app', function () {

  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset")

    cy.register({
      username: "ecukii",
      name: "ecuki",
      password: "ecuki"
    })
  })

  it('front page cane be open', function () {
    cy.contains('Log in to apllication')
  })

  it('Login from is shown', function () {
    cy.contains("username")
    cy.contains("password")
  })

  it('user can log in', function () {
    cy.get("#username").type('ecukii')
    cy.get("#password").type('ecuki')
    cy.get("#login-button").click()

    cy.contains("ecuki logged in")



  })

  it('login fails with wrong password', function () {
    cy.contains('Login').click()
    cy.get("#username").type('ecukii')
    cy.get("#password").type('ecukii')
    cy.get("#login-button").click()
    cy.get("#notification")
      .should('contain', 'Wrong credentials').and("have.css", "color", 'rgb(219, 40, 40)')
    cy.get("html").should('not.contain', "ecuki logged in")
  });



  describe.only('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: "ecukii", password: "ecuki" })
      cy.contains("ecuki logged in")
    })



    it('a new blog can be created', function () {
      cy.contains("New blog").click()
      cy.get("#title").type('new blog')
      cy.get("#author").type('ecukii')
      cy.get("#url").type('ecukidfsdfi')
      cy.get("#likes").type(12)
      cy.get("#add-blog-button").click()
      cy.contains("Blog 'new blog' by ecukii added successful")

    })
    describe('and a several blogs exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: "first blog", author: "Conrad", url: "first text", likes: 9997
        })
        cy.createBlog({
          title: "second blog", author: "Conrad", url: "second text", likes: 9998
        })
        cy.createBlog({
          title: "third blog", author: "Conrad", url: "third text", likes: 9999
        })

      })

      it('details can be show by View click', function () {
        cy.contains('third blog').parentsUntil('#blog').contains('View').as('theButton')
        cy.get('@theButton').click()

      });
      it('user can like a blog', function () {
        cy.contains('third blog').parentsUntil('#blog')
          .as('theBlog')

        cy.get('@theBlog').contains('View').click()
        cy.get('@theBlog').contains('Like').click()
        cy.get('@theBlog').contains("10000")
      });

      it('user who created a blog can delete it', function () {
        cy.contains('third blog').parentsUntil('#blog')
          .as('theBlog')

        cy.get('@theBlog').contains('View').click()
        cy.get('@theBlog').within(() => {
          cy.get('#delete-button').click()
        })
        cy.contains("@theBlog").should('not.exist')

      });
      it('other users cannot delete the blog', function () {
        cy.register({
          username: "other",
          name: "other",
          password: "other"
        })
        cy.login({ username: "other", password: "other" })
        cy.contains('third blog').parentsUntil('#blog')
          .as('theBlog')

        cy.get('@theBlog').contains('View').click()
        cy.get('@theBlog').within(() => {
          cy.get('#delete-button').should('not.exist')
        })
      });
      it.only('blogs are ordered according to likes with the blog with the most likes being first', function () {
        cy.get('[data-test-id="likes-number"]').then(($likes) => {
          let likes
          _.each($likes.get(), (el, i) => {
            likes = likes ? likes : $(el).text() * 1
            expect(likes).not.to.be.lessThan($(el).text() * 1)
            // expect($(el).text() * 1).to.include(9999)

            likes = $(el).text() * 1
          })
        })

      });
    })
  })
})





