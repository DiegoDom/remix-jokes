import type { Joke } from "@prisma/client";
import { Form, Link } from "@remix-run/react";

interface Props {
  canDelete?: boolean;
  isOwner: boolean;
  joke: Pick<Joke, "content" | "name">;
}

export function JokeDisplay({ canDelete = true, isOwner, joke }: Props) {
  return (
    <div>
      <p>Here's your hilarious joke:</p>
      <p>{joke.content}</p>
      <Link to=".">{joke.name} Permalink</Link>
      {isOwner ? (
        <Form method="post">
          <button className="button" disabled={!canDelete} name="intent" type="submit" value="delete">
            Delete
          </button>
        </Form>
      ) : null}
    </div>
  );
}
