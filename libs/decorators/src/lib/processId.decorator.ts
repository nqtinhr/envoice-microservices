import { MetadataKeys } from '@common/constants/common.constant'
import { getProcessId } from '@common/utils/string.util'
import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const ProcessId = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()

  return request[MetadataKeys.PROCESS_ID] || getProcessId()
})

/**
 Khi 2 service bff và invoice giao tiếp
 Nếu trường hợp chỉ nằm ở invoice thì request chỉ lấy 2 tham số data và processId nhưng mà không truy cập được context microservices
 */
