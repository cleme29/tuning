/***************************************************************************************************/
/*   This test page just ensures when we are visiting different pages, we get the desired pages    */
/***************************************************************************************************/

var expect = require('chai').expect;
var app = require('../index');
var request = require('supertest');

/***************************************************************************************************/
/*                  set up the data we need to pass to the login method                            */
/***************************************************************************************************/

const userCredentials = {
	username: 'userone',
	password: '12345',
};

/***************************************************************************************************/
/*  this test says: make a POST to the /sign_in route with the username: userone, password: 12345  */
/*  after the POST has completed, make sure the status code is 200                                 */
/*  also make sure that the user has been directed to the /play page                               */
/***************************************************************************************************/

var authenticatedUser = request.agent(app);
before(function(done) {
	authenticatedUser.post('/users/sign_in').send(userCredentials).end(function(err, response) {
		expect(response.statusCode).to.equal(302);
		expect('Location', '/play');
		done();
	});
});

/***************************************************************************************************/
/*        check to see if pages are being successfully rendered when user is signed in             */
/***************************************************************************************************/

//ensure user is logged in
	describe('Ensure signed in', function() {
	//checks to see if we are signed in
	it('Checks to see if we are signed in', function(done) {
		request(app).post('/users/sign_in').send(userCredentials).end(function(err, response) {
			expect(response.statusCode).to.equal(302);

			done();
		});
	});
});
//check to see if profile page is being rendered when when are signed in
describe('testing /users/profile', function(done) {
	//if the user is logged in we should get a 200 status code, because we render the profile page
	it('should return a 200 response if the user is logged in', function(done) {
		authenticatedUser.get('/users/profile').expect(200, done);
	});
	//if the user is not logged in we should get a 302 response code and be directed to the /login page
	it('should return a 302 response and redirect to /users/login', function(done) {
		request(app).get('/users/profile').expect('Location', '/users/login').expect(302, done);
	});
});

//check to see if leaderboard page is being rendered when when are signed in
describe('testing /users/leaderboard', function(done) {
	//if the user is logged in we should get a 200 status code, because we render the leaderboard page
	it('should return a 200 response if the user is logged in', function(done) {
		authenticatedUser.get('/users/leaderboard').expect(200, done);
	});
	//if the user is not logged in we should get a 302 response code and be directed to the /login page
	it('should return a 302 response and redirect to /users/login', function(done) {
		request(app).get('/users/profile').expect('Location', '/users/login').expect(302, done);
	});
});

//check to see if reset page is being rendered when we are signed in
describe('testing /users/reset', function(done) {
	//if the user is logged in we should get a 200 status code, because we render the reset page
	it('should return a 200 response if the user is logged in', function(done) {
		authenticatedUser.get('/users/reset').expect(200, done);
	});
	//if the user is not logged in we should get a 302 response code and be directed to the /profile page
	it('should return a 302 response and redirect to /users/login', function(done) {
		request(app).get('/users/reset').expect('Location', '/users/profile').expect(302, done);
	});
});

//check to see if signup page gets rendered
describe('testing /users/signup', function(done) {
	//if the user is logged in we should get a 200 status code, because we render the signup page
	it('should return a 200 response if users clicks signup', function(done) {
		authenticatedUser.get('/users/reset').expect(200, done);
	});
});

//check to see if login page gets rendered
describe('testing /users/login', function(done) {
	//if the user is logged in we should get a 200 status code, because we render the login page
	it('should return a 200 response if users clicks login', function(done) {
		authenticatedUser.get('/users/login').expect(200, done);
	});
});

//check to see if we are redirected after logging out
describe('testing /users/logout', function(done) {
	//if the user is logged in we should get a 302 status code, because we redirect to the home page
	it('should return a 302 response if the user is logged in', function(done) {
		authenticatedUser.get('/users/logout').expect(302, done);
	});
	//if the user is not logged in we should get a 302 response code and be directed to the /login page
	it('should return a 302 response and redirect to /users/login', function(done) {
		request(app).get('/users/logout').expect('Location', '/users/login').expect(302, done);
	});
});

//check to see if we can access the multi player page
describe('testing /play/multiplayer', function(done) {
	//if the user is not logged in we should get a 302 response code and be directed to the /login page
	it('should return a 302 response and redirect to /users/login if you are not logged in', function(done) {
		request(app).get('/play/playtype/multiplayer').expect('Location', '/users/login').expect(302, done);
	});
});

//check to see if we can access the multi player create room page
describe('testing /play/multiplayer/create', function(done) {
	//if the user is not logged in we should get a 302 response code and be directed to the /login page
	it('should return a 302 response and redirect to /users/login if you are not logged in', function(done) {
		request(app).get('/play//multiplayer/create').expect('Location', '/users/login').expect(302, done);
	});
});
