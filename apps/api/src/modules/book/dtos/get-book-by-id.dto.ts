import { t } from "elysia";

export const stringToNumberTransform = t
  .Transform(t.String())
  .Decode((value) => new Number(value))
  .Encode((value) => value.toString());

export const getBookByIdDto = t.Object({
  id: t.String(),
});
