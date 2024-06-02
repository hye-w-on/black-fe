import { EmployeeLoginRequest, EmployeeSession, SocialSessionResponse } from '../models/session';
import { Method, RestApiResponse, ServiceName } from '../models/restApi';
import { callRestApi } from '../utils/RestApiUtil';
import { MemberProfile } from '../models/member';

const sessionApi = {
  socialLogin: async (
    socialPlatform: string,
    authCode: string
  ): Promise<RestApiResponse<SocialSessionResponse>> => {
    return callRestApi({
      serviceName: ServiceName.AQUA_BE,
      url: `/v1/session/social`,
      method: Method.POST,
      body: {
        socialPlatform: socialPlatform,
        authCode: authCode,
      },
    });
  },

  employeeLogin: async (
    employeeLoginRequest: EmployeeLoginRequest
  ): Promise<RestApiResponse<EmployeeSession>> => {
    return callRestApi({
      serviceName: ServiceName.AQUA_BE,
      url: `/http-session/employee`,
      method: Method.POST,
      body: {
        ...employeeLoginRequest,
        languageCode: 'ko', //TODO
      },
    });
  },

  getEmployeeSession: async (): Promise<RestApiResponse<EmployeeSession>> => {
    return callRestApi({
      serviceName: ServiceName.AQUA_BE,
      url: `/http-session/employee`,
      method: Method.GET,
    });
  },

  checkHttpSessionScope: async () => {
    return callRestApi({
      serviceName: ServiceName.AQUA_BE,
      url: `/http-session/scope`,
      method: Method.GET,
    });
  },

  memberSignUp: async (memberProfile: MemberProfile): Promise<RestApiResponse<any>> => {
    return callRestApi({
      serviceName: ServiceName.AQUA_BE,
      url: '/member',
      method: Method.POST,
      body: memberProfile,
    });
  },
};

export default sessionApi;
