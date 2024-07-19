import { createParamDecorator, ExecutionContext, HttpStatus } from "@nestjs/common";

export const CompareVerify = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const res = ctx.switchToHttp().getResponse();
  const { verify } = req.body;

  if (!verify || verify.autor_id !== verify.submitter_id) {
    res.status(HttpStatus.FORBIDDEN).json({ message: 'Не уполномочен' });
    return false;
  }

  return true;
});