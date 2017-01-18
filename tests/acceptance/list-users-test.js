import { test } from 'qunit';
import moduleForAcceptance from 'people-app/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | list users');

test('visiting /', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});

// test('should redirect to users route', function (assert) {
// 	visit('/');
// 	andThen(function() {
// 		assert.equal(currentURL(), '/users', 'should redirect automatically');
// 	});
// });

// test('should list all users', function (assert) {
// 	visit('/');
// 	andThen(function () {
// 		asser.equal(find('.user').length, 3, 'should see 3 users');
// 	});
// });

// test('should link to create user', function (assert) {
// 	visit('/');
// 	click('a:contains("create")
// });

// test('should link to edit user', function (assert) {
// });

// test('should link to delete user', function (assert) {
// });