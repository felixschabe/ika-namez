import {Response} from 'express';

export function createDefaultApiResponse(
  res: Response,
  error: boolean,
  message: string,
  status: number
): void {
  res.status(status).json({message, error, status});
  if (error) {
    return;
  }
}
