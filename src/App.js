import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import LayoutNavbar from "./components/LayoutNavbar";
import Modal from "react-modal";
import Categories from "./pages/Categories";
import SearchResults from "./pages/SearchResults";
import Profile from "./pages/Profile";
import OrderDetails from "./pages/OrderDetails";
import Checkout from "./pages/Checkout";
import Completed from "./pages/Completed";
import Terms from "./pages/Terms";
import About from "./pages/About";
import ProductDetails from "./pages/ProductDetails";
import { useAuth } from "./context/user-auth";
import ScrollToTop from "./components/ScrollToTop";
import Contact from "./pages/Contact";
import Favorites from "./pages/Favorites";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  Modal.setAppElement("#root");
  const auth = useAuth();

  return (
    <div>
      {!auth.isLoading && (
        <Router>
          <ScrollToTop />
          <div className="font-circular">
            <Switch>
              <Route exact path="/cart/checkout">
                <Checkout />
              </Route>

              <Route exact path="/completed">
                <Completed />
              </Route>

              <Route exact path="/productos/detalles/:productId">
                <ProductDetails />
              </Route>

              <LayoutNavbar>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/login">
                  <Home />
                </Route>
                <Route exact path="/productos/categorias/:categoryId">
                  <Categories />
                </Route>
                <Route exact path="/productos/categorias/:categoryId/:subcategoryId">
                  <Categories />
                </Route>
                <PrivateRoute path="/perfil">
                  <Profile />
                </PrivateRoute>
                <PrivateRoute path="/orderDetails/:orderId">
                  <OrderDetails />
                </PrivateRoute>
                <PrivateRoute path="/favoritos">
                  <Favorites />
                </PrivateRoute>
                <Route exact path="/busqueda">
                  <SearchResults />
                </Route>
                <Route exact path="/sobre-nosotros">
                  <About />
                </Route>
                <Route path="/terminos">
                  <Terms />
                </Route>
                <Route path="/contactenos">
                  <Contact />
                </Route>
              </LayoutNavbar>
            </Switch>
          </div>
          <ToastContainer
            position="bottom-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Router>
      )}
    </div>
  );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default App;
