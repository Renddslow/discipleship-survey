import polka from 'polka';

const surveys = polka()
  // @admin - List all of an organization's surveys
  .get('/')
  // Get survey
  .get('/:id')
  // @admin Update survey
  .put('/:id')
  // @admin Change status of survey (close, publish)
  .patch('/:id')
  // Create new survey session
  .post('/:id/session')
  // Create new survey answer
  .post('/:id/questions/:questionId/answer')
  // Create survey completion
  .post('/:id/completions');

export default surveys;
