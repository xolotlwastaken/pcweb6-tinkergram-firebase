import React, { useEffect, useState } from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { signOut } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function PostPageAdd() {
    const [user, loading] = useAuthState(auth);
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState("");
    const navigate = useNavigate();

    async function addPost() {
        const imageReference = ref(storage, `images/${image.name}`);
        const response = await uploadBytes(imageReference, image);
        const imageUrl = await getDownloadURL(response.ref);
        await addDoc(collection(db, "posts"), { caption, image });
        navigate("/");
    }

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/login");
    }, [navigate, user, loading]);

    return (
    <>
      <Navbar variant="light" bg="light">
        <Container>
          <Navbar.Brand href="/">Tinkergram</Navbar.Brand>
          <Nav>
            <Nav.Link href="/add">New Post</Nav.Link>
            <Nav.Link onClick={(e)=> signOut(auth)}>🚪</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <h1 style={{ marginBlock: "1rem" }}>Add Post</h1>
        <Form>
          <Form.Group className="mb-3" controlId="caption">
            <Form.Label>Caption</Form.Label>
            <Form.Control
              type="text"
              placeholder="Lovely day"
              value={caption}
              onChange={(text) => setCaption(text.target.value)}
            />
          </Form.Group>

          {/* Add image by url */}
          {/* <Form.Group className="mb-3" controlId="image">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="https://zca.sg/img/1"
              value={image}
              onChange={(text) => setImage(text.target.value)}
            />
            <Form.Text className="text-muted">
              Make sure the url has a image type at the end: jpg, jpeg, png.
            </Form.Text>
          </Form.Group> */}

          {/* Add image by file */}
          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Group>

          <Button variant="primary" onClick={async (e) => addPost()}>
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}