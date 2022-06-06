export abstract class RequestHandler<TRequest, TResponse> {
  abstract handle(request: TRequest): Promise<TResponse>;
}
