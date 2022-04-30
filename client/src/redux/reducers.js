import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import authUser from './auth/reducer';
import todoApp from './todo/reducer';
import chatApp from './chat/reducer';
import surveyListApp from './surveyList/reducer';
import surveyDetailApp from './surveyDetail/reducer';
import adminsListApp from './adminsList/reducer';
import facultiesListApp from './facultiesList/reducer';
import newsListApp from './newsList/reducer';
import advsListApp from './advsList/reducer';
import filesListApp from './filesList/reducer';
import facultyDetailsApp from './facultyDetail/reducer';
import departmentListApp from './departmentsList/reducer';
import speechListApp from './speechList/reducer';
import articlesListApp from './articlesList/reducer';

const reducers = combineReducers({
  menu,
  settings,
  authUser,
  todoApp,
  chatApp,
  speechListApp,
  filesListApp,
  surveyListApp,
  surveyDetailApp,
  adminsListApp,
  facultiesListApp,
  advsListApp,
  newsListApp,
  facultyDetailsApp,
  departmentListApp,
  articlesListApp,
});

export default reducers;
