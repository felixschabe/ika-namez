import {bind} from 'decko';
import {Request, Response} from 'express';
import {createDefaultApiResponse} from '../../utils/utils';

export class NotFoundController {
  @bind
  getNotFoundMessage(req: Request, res: Response) {
    return createDefaultApiResponse(res, true, 'not found', 404);
  }
}
