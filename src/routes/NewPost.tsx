import { useState } from "react";
import classes from "./NewPost.module.css";
import Modal from "../components/Modal";
import { Form, Link, redirect } from "react-router-dom";

function NewPost() {
  return (
    <Modal>
      <Form method="post" className={classes.form}>
        <p>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" required name="author" />
        </p>
        <p>
          <label htmlFor="body">Text</label>
          <textarea id="body" required rows={3} name="body" />
        </p>
        <p className={classes.actions}>
          <Link to=".." type="button">
            Cancel
          </Link>
          <button>Submit</button>
        </p>
      </Form>
    </Modal>
  );
}

export default NewPost;

//there is no backend involved here
//we are just sending a request to the backend and all runs on the client side in the browser
export async function action({ request }: any) {
  const formData = await request.formData();
  const postData = Object.fromEntries(formData); // { body: '....', author: '...'}

  await fetch("http://localhost:8080/posts", {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return redirect("/");
}
