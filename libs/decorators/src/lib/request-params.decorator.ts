import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const RequestParams = createParamDecorator((param: string, ctx: ExecutionContext) => {
  const request = ctx.switchToRpc().getData()
  // Trường hợp lấy toàn bộ dữ liệu của object -> request.data
  // Nếu data là một dạng object thì có thể truyền param để lấy giá trị cụ thể -> request.data[param]
  if (!param) {
    return request.data
  }

  return request.data[param]
})
