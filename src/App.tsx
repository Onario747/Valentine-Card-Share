import { useSearchParams } from "react-router-dom";
import CreateCard from "./components/CreateCard";
import ValentineCard from "./components/ValentineCard";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CreateCard />} />
      <Route
        path="/view"
        element={
          <ValentineCard
            sender={
              new URLSearchParams(window.location.search).get("sender") || ""
            }
            recipient={
              new URLSearchParams(window.location.search).get("recipient") || ""
            }
            message={
              new URLSearchParams(window.location.search).get("message") || ""
            }
            image={
              new URLSearchParams(window.location.search).get("image") ||
              undefined
            }
            style={
              new URLSearchParams(window.location.search).get("style") ||
              "classic"
            }
          />
        }
      />
    </Routes>
  );
}

export default App;
