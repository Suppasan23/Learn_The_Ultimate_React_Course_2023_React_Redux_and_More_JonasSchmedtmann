import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { CitiesContext_Provider } from "./contexts/CitiesContext";
import { AuthContext_Provider } from "./contexts/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Formm from "./components/Formm";
import SpinnerFullPage from "./components/SpinnerFullPage";

/* import Product from "./pages/Product";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound"; */

const Homepage = lazy(()=>import('./pages/Homepage'));
const Product = lazy(()=>import('./pages/Product'));
const Pricing = lazy(()=>import('./pages/Pricing'));
const Login = lazy(()=>import('./pages/Login'));
const AppLayout = lazy(()=>import('./pages/AppLayout'));
const PageNotFound = lazy(()=>import('./pages/PageNotFound'));

// dist/assets/index-b12bf550.css   31.46 kB │ gzip:   5.25 kB
// dist/assets/index-203e8b91.js   529.18 kB │ gzip: 149.90 kB

function App() {
  return (
    <>
      <AuthContext_Provider>
        <CitiesContext_Provider>
            <BrowserRouter>
              <Suspense fallback={<SpinnerFullPage/>}>
                <Routes>
                  <Route index element={<Homepage />} />
                  <Route path="product" element={<Product />} />
                  <Route path="pricing" element={<Pricing />} />
                  <Route path="login" element={<Login />} />
                  <Route path="app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
                    <Route index element={<Navigate replace to="cities"/>}/>
                    <Route path="cities" element={<CityList />}/>
                    <Route path="cities/:id" element={<City />}/>
                    <Route path="countries" element={<CountryList />}/>
                    <Route path="form" element={<Formm />}/>
                  </Route>
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
        </CitiesContext_Provider>
      </AuthContext_Provider>
    </>
  )
}

export default App;