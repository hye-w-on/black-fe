import { HttpResponse, http, HttpHandler } from 'msw';
import { StatusCode, SuccessOrNot } from '../../models/restApi';

export const sampleHandler: HttpHandler[] = [
  http.get('http://localhost:5176/api/samples', () => {
    return HttpResponse.json({
      statusCode: StatusCode.SUCCESS,
      successOrNot: SuccessOrNot.Y,
      data: { date: 'a' },
    });
  }),
  http.get('/api/sample', () => {
    return HttpResponse.json({
      statusCode: StatusCode.SUCCESS,
      successOrNot: SuccessOrNot.Y,
      data: [{ title: 'title1' }, { title: 'title2' }, { title: 'title3' }],
    });
  }),
];
