import classes from "./NewPost.module.css";
import Modal from "../components/Modal.jsx";
import {Link, Form, redirect} from "react-router-dom";

function NewPost() {
  return (
    <Modal>
      <Form method="post" className={classes.form}>
        <p>
          <label htmlFor="body">Text</label>
          <textarea id="body" name="body" required rows={3} />
        </p>
        <p>
          <label htmlFor="name">Your name</label>
          <input
            type="text"
            name="author"
            id="name"
            required
          />
        </p>
        <Link to={"/"} className={classes.actions}>
          <button type="button">Cancel</button>
          <button>Submit</button>
        </Link>
      </Form>
    </Modal>
  );
}

export default NewPost;

export async function action({request}) {
  console.log(request)
  const formData = await request.formData();
  const postData = Object.fromEntries(formData);
  await fetch('http://localhost:8080/posts', {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: {
      'Content-Type' : 'application/json',
    },
  });

  return redirect('/');
}