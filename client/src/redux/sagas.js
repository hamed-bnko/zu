import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import todoSagas from './todo/saga';
import chatSagas from './chat/saga';
import surveyListSagas from './surveyList/saga';
import surveyDetailSagas from './surveyDetail/saga';
import adminsListSagas from './adminsList/saga';
import facultiesListSagas from './facultiesList/saga';
import newsListSagas from './newsList/saga';
import advsListSagas from './advsList/saga';
import filesListSagas from './filesList/saga';
import facultyDetailsSaga from './facultyDetail/saga';
import departmentListSage from './departmentsList/saga';

export default function* rootSaga() {
  yield all([
    authSagas(),
    todoSagas(),
    chatSagas(),
    surveyListSagas(),
    surveyDetailSagas(),
    adminsListSagas(),
    filesListSagas(),
    facultiesListSagas(),
    advsListSagas(),
    newsListSagas(),
    facultyDetailsSaga(),
    departmentListSage(),
  ]);
}
