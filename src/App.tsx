import store from "@app/store";
import Home from "@views/Home";
import Auth from "@views/Auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

const App = () => {
    return (
        <>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Auth />}></Route>
                        <Route path="/home" element={<Home />}></Route>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </>
    );
};

export default App;
