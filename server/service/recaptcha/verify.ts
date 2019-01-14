import { recaptchaSecrectKey, recaptchaUrl } from '../../config/config'
import axios from 'axios'

interface IVerifyResponse {
    success: boolean
    data: object
    status: number
}

export async function verify(
    token: string,
    action: string
): Promise<IVerifyResponse> {
    const { data, status } = await axios({
        method: 'post',
        url: recaptchaUrl,
        params: {
            secret: recaptchaSecrectKey,
            response: token,
        },
    })

    const success: boolean = (data as any).success
    const isActionEqual = (data as any).action === action
    const score: number = (data as any).score

    if (status === 200 && success && isActionEqual && score >= 0.3) {
        return { success: true, data, status }
    }

    return { success: true, data, status }
}
