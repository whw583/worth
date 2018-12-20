import * as moment from 'moment'
import 'moment/min/locales'

const hostName = window.location.hostname
if (hostName.startsWith('cn.')) {
    // cn
    moment.locale('zh-cn')
} else if (hostName.startsWith('tw.')) {
    // tw
    moment.locale('zh-tw')
} else if (hostName.startsWith('hk.')) {
    // hk
    moment.locale('zh-hk')
} else {
    // default
    moment.locale('en-us')
}
