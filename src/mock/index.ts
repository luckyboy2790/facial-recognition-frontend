import { mock } from './MockAdapter'
import './fakeApi/authFakeApi'
import './fakeApi/commonFakeApi'

mock.onAny().passThrough()
