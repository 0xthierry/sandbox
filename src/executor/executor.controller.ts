import { Request, Response } from 'express';
import extract from 'extract-zip';
import uuid from 'uuid/v4';
import Axios from 'axios';
import fs from 'fs';
import path from 'path';
import Git from 'nodegit';
import { IExecutorStartRequest } from './interfaces';

export default class ExecutorController {
  async start(request: Request, response: Response): Promise<Response> {
    const startRequest: IExecutorStartRequest = request.body;
    const id = uuid();
    await Git.Clone.clone(
      startRequest.path,
      path.resolve(__dirname, '..', '..', 'tmp', id)
    );
    return response.status(201).json({ job: id });
  }
}
