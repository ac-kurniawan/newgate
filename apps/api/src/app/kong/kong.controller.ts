import { KongService } from './kong.service';
import { Express } from 'express';
import { handleResponseError } from '@newgate/error-apps';
import {
  createKongDtoValdiator,
  KongDto,
  quickCreateKongDtoValdiator,
  createKongQueryParamsValidator,
} from '@newgate/dto';
import { kongErrorList } from './kong.errors';
import { Response } from '@newgate/model';

export const kongController = (app: Express, kongService: KongService) => {
  app.post('/api/admin/kong', async (req, res) => {
    try {
      const query = await createKongQueryParamsValidator.validate(req.query);
      const isQuickSetup = query.isQuickSetup;
      let request;
      if (!isQuickSetup) {
        request = await createKongDtoValdiator.validate(req.body);
      } else {
        request = await quickCreateKongDtoValdiator.validate(req.body);
      }
      const result = await kongService.createNewKong(
        {
          accountId: '',
          baseUrl: '',
          port: 0,
          name: '',
        },
        isQuickSetup
      );
      const response: Response<KongDto> = {
        data: {
          ...result,
        },
      };
      res.status(200).send(response);
    } catch (error) {
      const err = handleResponseError(error, kongErrorList);
      res.status(err.data.httpCode).send(err);
    }
  });
};
