import Alert from "../components/Alert";
import GayButton from "../components/GayButton";
import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import GenerateButton from "../components/GenerateButton";
import QuoteBox from "../components/QuoteBox";
import AuthorBox from "../components/AuthorBox";
import GrayButton from "../components/GrayButton";
import SaveList from "../components/SaveList";
import SaveListButton from "../components/SaveListButton";
import FavoriteIcon from "../components/FavoriteIcon";
import LoginButton from "../components/LoginButton";

const QuoteAPIURL =
  "https://api.quotable.io/quotes/random?tags=motivational|change|character|competition|courage|creativity|education|ethics|faith|family|famous-quotes|friendship|future|generosity|gratitude|happiness|health|honor|inspirational|leadership|life|love|opportunity|perseverance|power-quotes|self|self-help|success|time|tolerance|wellness|wisdom|work";

function App() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(-1);
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [liked, setLiked] = useState(false);
  const [quoteList, setQuoteList] = useState<string[]>([]);
  const [authorList, setAuthorList] = useState<string[]>([]);

  // Fetching data from Quote API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(QuoteAPIURL);
        const json = await response.json();
        const fetchedQuote = json[0].content;
        const fetchedAuthor = json[0].author;
        setQuote(fetchedQuote);
        setAuthor(fetchedAuthor);
        setIsButtonClicked(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (quoteIndex >= 0) {
      fetchData();
    }
  }, [quoteIndex]);

  // Updating the Save List on Favorite icon
  useEffect(() => {
    if (!isButtonClicked) {
      if (liked) {
        setQuoteList([...quoteList, quote]);
        setAuthorList([...authorList, author]);
      } else {
        setQuoteList(quoteList.filter((q) => q !== quote));
        setAuthorList(authorList.filter((a) => a !== author));
      }
    }
  }, [liked, isButtonClicked]);

  const handleGayClick = () => {
    setAlertVisible(true);
  };

  const handleGenerateClick = () => {
    setQuoteIndex(quoteIndex + 1);
    setIsButtonClicked(true);
    setLiked(false);
  };

  const handleHeartClick = () => {
    setLiked(!liked);
  };

  const handleTrashModalDelete = (quoteRemove: string) => {
    const deleteIndex = quoteList.indexOf(quoteRemove);
    if (deleteIndex !== -1) {
      const updatedQuotes = [...quoteList];
      const updatedAuthors = [...authorList];
      updatedQuotes.splice(deleteIndex, 1);
      updatedAuthors.splice(deleteIndex, 1);
      setQuoteList(updatedQuotes);
      setAuthorList(updatedAuthors);
    }
    if (deleteIndex === quoteList.length - 1) {
      setLiked(false);
    }
  };

  return (
    <>
      {alertVisible && <Alert onClose={() => setAlertVisible(false)} />}
      <div className="text-center">
        <Heading>Motivational Quotes Generator</Heading>
        <SubHeading>Made by: Suppleo</SubHeading>
        <GayButton onClick={handleGayClick} />

        {isButtonClicked ? (
          <GrayButton>Generating...</GrayButton>
        ) : (
          <GenerateButton onClick={handleGenerateClick} />
        )}

        <SaveListButton>Favorite Quotes</SaveListButton>
        <LoginButton />
      </div>

      <div className="text-center">
        {quoteIndex >= 0 && (
          <FavoriteIcon liked={liked} onClick={handleHeartClick} />
        )}
      </div>

      <div className="text-center">
        {quoteIndex >= 0 && (
          <div>
            <QuoteBox>{quote}</QuoteBox>
            <AuthorBox>{author}</AuthorBox>
          </div>
        )}
      </div>

      <SaveList
        quotes={quoteList}
        authors={authorList}
        onRemoveButtonClick={(quoteRemove) =>
          handleTrashModalDelete(quoteRemove)
        }
      />
    </>
  );
}

export default App;
