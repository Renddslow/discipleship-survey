import polka from 'polka';

const users = polka()
  // @admin get all users for an org
  .get('/')
  // @admin create new org user
  .post('/')
  // @admin get an org user
  .get('/:id');

export default users;
