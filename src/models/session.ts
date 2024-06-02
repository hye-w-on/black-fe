export interface SocialSessionResponse {
  redisSessionId: string;
  // cognito 사용할 경우
  cognitoUuid?: string;
  cognitoAccessToken?: string;
  cognitoRefreshToken?: string;
}

export interface EmployeeLoginRequest {
  employeeId: string;
  languageCode?: string;
}

export interface EmployeeSession {
  employeeId: string;
  name: string;
  languageCode: string;
  roleCodes: string[];
}
