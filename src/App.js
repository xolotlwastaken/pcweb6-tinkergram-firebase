import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PostPageHome from "./views/PostPageHome";
import LoginPage from "./views/LoginPage";
import SignUpPage from "./views/SignUpPage";
import PostPageAdd from "./views/PostPageAdd";
import PostPageDetails from "./views/PostPageDetails";
import PostPageUpdate from "./views/PostPageUpdate";

function App() {
  
  const router = createBrowserRouter([
    { path: "/", element: <PostPageHome /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/signUp", element: <SignUpPage /> },
    { path: "/add", element: <PostPageAdd /> },
    { path: "/post/:id", element: <PostPageDetails /> },
    { path: "/update/:id", element: <PostPageUpdate /> },
    
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
