import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatsPage from "../../pages/chatsPage/ChatsPage";
import SingleChatPage from "../../pages/singleChatPage/SingleChatPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:userId" element={<ChatsPage/>}/>
        <Route path="/chat/:userId/:objectId" element={<SingleChatPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
