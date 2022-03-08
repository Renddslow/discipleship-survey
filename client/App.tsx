import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import SurveyWrapper from './routes/SurveyWrapper';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/surveys/:id" element={<SurveyWrapper />}>
          <Route path="" element={<div>Hello world</div>} />
          <Route path="questions/:questionId" element={<div>Yo yo</div>} />
          <Route path="completion" element={<div>Completion</div>} />
        </Route>
        <Route path="/admin" element={<div>Admin Header</div>}>
          <Route index element={<div>Home page</div>} />
          <Route path="users" element={<div>Users</div>} />
          <Route path="users/new" element={<div>User Editor -- new</div>} />
          <Route path="users/:userId" element={<div>User Editor</div>} />
          <Route path="surveys" element={<div>Survey list</div>} />
          <Route path="surveys/new" element={<div>Survey editor</div>} />
          <Route path="surveys/:id" element={<div>Survey editor</div>} />
          <Route path="surveys/:id/rewards" element={<div>Survey editor</div>} />
          <Route path="church" element={<div>Church editor</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
