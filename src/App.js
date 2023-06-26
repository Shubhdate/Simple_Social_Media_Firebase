import Pages from "./components/Pages/Pages";
import { BrowserRouter} from "react-router-dom";
import AppContext from "./components/AppContext/AppContext";

export default function App() {
  return (
    <>
    <BrowserRouter> 
      <AppContext>
        <Pages/> 
      </AppContext>
    </BrowserRouter>
    </>
  )
}