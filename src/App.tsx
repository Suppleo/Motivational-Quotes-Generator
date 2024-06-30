import Alert from "./components/Alert";
import GayButton from "./components/GayButton";
import { useState } from "react";
import Heading from "./components/Heading";
import SubHeading from "./components/SubHeading";
import GenerateButton from "./components/GenerateButton";
import QuoteBox from "./components/QuoteBox";
import AuthorBox from "./components/AuthorBox";

function App() {
  let [count, setCount] = useState(0);
  let [alertVisible, setAlertVisible] = useState(false);
  let [quoteVisible, setQuoteVisible] = useState(false);

  const handleGayClick = () => {
    setCount((count = count + 1));
    setAlertVisible(true);
  };

  const handleGenerateClick = () => {
    setQuoteVisible(!quoteVisible);
  };

  return (
    <>
      {alertVisible && <Alert onClose={() => setAlertVisible(false)} />}
      <div className="text-center">
        <Heading>Motivational Quotes Generator</Heading>
        <SubHeading>Made by: Suppleo</SubHeading>
        <GayButton count={count} onClick={handleGayClick} />
        <GenerateButton onClick={handleGenerateClick} />
        {quoteVisible && (
          <div>
            <QuoteBox>It’s not a bug, it’s an undocumented feature.</QuoteBox>
            <AuthorBox>- Suppleo</AuthorBox>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
