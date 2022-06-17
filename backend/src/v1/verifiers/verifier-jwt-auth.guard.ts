import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class VerifierJwtAuthGuard extends AuthGuard('jwt') {}
