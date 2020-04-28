import React from "react";

export default function Anecdote({ anecdote, votes }) {
  return (
    <>
      <blockquote> {`"${anecdote}"`}</blockquote>
      <p>
        Votes: <strong>{votes}</strong>
      </p>
      <br />
    </>
  );
}
