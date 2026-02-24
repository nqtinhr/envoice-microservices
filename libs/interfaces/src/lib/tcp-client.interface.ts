import { RequestType, ResponseType } from '@common/dtos/tcp/common'
import { Observable } from 'rxjs'

export interface TcpClient {
  send<TResult = any, TInput = any>(pattern: any, data?: RequestType<TInput>): Observable<ResponseType<TResult>>
  emit<TResult = any, TInput = any>(pattern: any, data?: RequestType<TInput>): Observable<ResponseType<TResult>>
}
