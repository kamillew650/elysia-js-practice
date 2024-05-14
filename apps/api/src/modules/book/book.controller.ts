import { Elysia, t } from "elysia";
import { getBookByIdHandler } from "./actions/get-book-by-id.handler";
import { getBookByIdResponseDto } from "./dtos/get-book-by-id-response.dto";
import {
  getBookByIdDto,
  stringToNumberTransform,
} from "./dtos/get-book-by-id.dto";
import { Value } from "@sinclair/typebox/value";

export const bookController = new Elysia().group("/book", (app) =>
  app
    .get("", () => "Get all books", {
      tags: ["Book"],
    })
    .get(
      ":id",
      ({ params }) =>
        getBookByIdHandler(Value.Decode(stringToNumberTransform, params.id)),
      {
        params: getBookByIdDto,
        response: getBookByIdResponseDto,
        tags: ["Book"],
      }
    )
    .post("", ({ body }) => ({ test: `Create book with name ${body.name}` }), {
      body: t.Object({ name: t.String({ maxLength: 10 }) }),
      tags: ["Book"],
    })
);
