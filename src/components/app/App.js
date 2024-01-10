import { BrowserRouter, Route, Routes, Navigate  } from "react-router-dom";
import ChatsPage from "../../pages/chatsPage/ChatsPage";
import SingleChatPage from "../../pages/singleChatPage/SingleChatPage";
import { useExpand, useInitData } from "@vkruglikov/react-telegram-web-app";
import { useEffect } from "react";

function App() {
  const [initDataUnsafe] = useInitData();

  const [, expand] = useExpand();

  useEffect(() => {
    expand();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={/* `${initDataUnsafe.user.id}` */ '693764287'}/>}/>
        <Route path="/:userId" element={<ChatsPage/>}/>
        <Route path="/chat/:userId/:objectId" element={<SingleChatPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
