import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { OfficesService } from 'src/offices/offices.service';

@Injectable()
export class OfficeExists implements CanActivate {
  constructor(private officesService: OfficesService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.officesService
      .findOne(request.body.office)
      .then((resp) => !!resp);
  }
}
