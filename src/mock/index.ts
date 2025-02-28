import { mock } from './MockAdapter'
import './fakeApi/authFakeApi'
import './fakeApi/commonFakeApi'
import './fakeApi/employeeApi'

mock.onAny().passThrough()
