import Alert from "./components/Alert";
import GayButton from "./components/GayButton";
import { useEffect, useState } from "react";
import Heading from "./components/Heading";
import SubHeading from "./components/SubHeading";
import GenerateButton from "./components/GenerateButton";
import QuoteBox from "./components/QuoteBox";
import AuthorBox from "./components/AuthorBox";

const QuoteAPIURL = "https://api.quotable.io/quotes/random";

function App() {
  const [count, setCount] = useState(0);
  const [alertVisible, setAlertVisible] = useState(false);
  const [quoteVisible, setQuoteVisible] = useState(false);
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(QuoteAPIURL);
        const json = await response.json();
        const fetchedQuote = json[0].content;
        const fetchedAuthor = json[0].author;
        setQuote(fetchedQuote);
        setAuthor(fetchedAuthor);
        setLoading(false); // Set loading state to false after data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (quoteVisible) {
      fetchData();
    }
  }, [quoteVisible]);

  const handleGayClick = () => {
    setCount(count + 1);
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
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                <QuoteBox>{quote}</QuoteBox>
                <AuthorBox>{author}</AuthorBox>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
