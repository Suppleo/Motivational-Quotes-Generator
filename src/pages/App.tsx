import { useCallback, useEffect, useState } from "react";
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
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Alert from "../components/Alert";
import LogoutButton from "../components/LogoutButton";
import Button from "../components/Button";
import GuestFavoritesModal from "../components/GuestFavoritesModal";

const QuoteAPIURL =
  "https://api.quotable.io/quotes/random?tags=motivational|change|character|competition|courage|creativity|education|ethics|faith|family|famous-quotes|friendship|future|generosity|gratitude|happiness|health|honor|inspirational|leadership|life|love|opportunity|perseverance|power-quotes|self|self-help|success|time|tolerance|wellness|wisdom|work";

interface FavoriteQuote {
  quote: string;
  author: string;
}
function App() {
  const [successAlertVisible, setSuccessAlertVisible] = useState(false);
  const [signedInUsername, setSignedInUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(-1);
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [liked, setLiked] = useState(false);
  const [quoteList, setQuoteList] = useState<string[]>([]);
  const [authorList, setAuthorList] = useState<string[]>([]);
  const [logoutMessage, setLogoutMessage] = useState("");
  const [favoriteQuotes, setFavoriteQuotes] = useState<FavoriteQuote[]>([]);
  const [error, setError] = useState("");
  const [showGuestFavoritesModal, setShowGuestFavoritesModal] = useState(false);
  const [guestFavorites, setGuestFavorites] = useState<FavoriteQuote[]>([]);
  const [isAIGenerated, setIsAIGenerated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    console.log("App component mounted");
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("Auth state changed. User:", user?.uid);
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setSignedInUsername(userData.username);
          setSuccessAlertVisible(true);
          setIsLoggedIn(true);
          console.log("User logged in:", userData.username);
          // Load favorite quotes
          if (userData.favoriteQuotes) {
            setFavoriteQuotes(userData.favoriteQuotes);
            setQuoteList(
              userData.favoriteQuotes.map((fq: FavoriteQuote) => fq.quote)
            );
            setAuthorList(
              userData.favoriteQuotes.map((fq: FavoriteQuote) => fq.author)
            );
          }
        }
      } else {
        console.log("User logged out or not logged in");
        setSignedInUsername("");
        setIsLoggedIn(false);
        // Load guest favorites from localStorage
        const storedGuestFavorites = localStorage.getItem("guestFavorites");
        console.log("Stored guest favorites:", storedGuestFavorites);
        if (storedGuestFavorites) {
          const parsedGuestFavorites = JSON.parse(storedGuestFavorites);
          setFavoriteQuotes(parsedGuestFavorites);
          setQuoteList(
            parsedGuestFavorites.map((fq: FavoriteQuote) => fq.quote)
          );
          setAuthorList(
            parsedGuestFavorites.map((fq: FavoriteQuote) => fq.author)
          );
        } else {
          // Clear favorite quotes when logged out and no guest favorites
          setFavoriteQuotes([]);
          setQuoteList([]);
          setAuthorList([]);
        }
        setShowGuestFavoritesModal(false);
      }
    });
    setIsInitialized(true);
    checkAndSetGuestFavorites();

    return () => unsubscribe();
  }, []);

  const checkAndSetGuestFavorites = useCallback(() => {
    const storedGuestFavorites = localStorage.getItem("guestFavorites");
    console.log("Checking guest favorites. Stored:", storedGuestFavorites);
    if (storedGuestFavorites && isLoggedIn) {
      const parsedGuestFavorites = JSON.parse(storedGuestFavorites);
      if (parsedGuestFavorites.length > 0) {
        setGuestFavorites(parsedGuestFavorites);
        setShowGuestFavoritesModal(true);
        console.log("Guest favorites modal should show");
      }
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isInitialized && isLoggedIn) {
      checkAndSetGuestFavorites();
    }
  }, [isInitialized, isLoggedIn, checkAndSetGuestFavorites]);

  // Update Firestore when favoriteQuotes change
  useEffect(() => {
    const updateFirestore = async () => {
      if (isLoggedIn && auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, { favoriteQuotes });
      } else {
        // Store favorites in localStorage when user is not logged in
        localStorage.setItem("guestFavorites", JSON.stringify(favoriteQuotes));
      }
    };

    updateFirestore();
  }, [favoriteQuotes, isLoggedIn]);

  // Fetching data from Quote API
  const fetchData = async () => {
    setIsButtonClicked(true);
    setError("");
    setLiked(false); // Reset liked state for new quote

    const timeoutDuration = 4000; // 4 seconds timeout
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeoutDuration)
    );

    try {
      const responsePromise = fetch(QuoteAPIURL);
      const response = await Promise.race([responsePromise, timeoutPromise]);

      if (!(response instanceof Response)) {
        throw new Error("Fetch failed");
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      if (!Array.isArray(json) || json.length === 0) {
        throw new Error("Invalid response format");
      }

      const fetchedQuote = json[0].content;
      const fetchedAuthor = json[0].author;

      if (
        typeof fetchedQuote !== "string" ||
        typeof fetchedAuthor !== "string"
      ) {
        throw new Error("Invalid quote data");
      }

      setQuote(fetchedQuote);
      setAuthor(fetchedAuthor);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Cannot generate quote. Please check or change your network.");
    } finally {
      setIsButtonClicked(false);
    }
  };

  useEffect(() => {
    if (quoteIndex >= 0 && !isAIGenerated) {
      fetchData();
    }
  }, [quoteIndex, isAIGenerated]);

  const handleGenerateClick = () => {
    setIsAIGenerated(false);
    setQuoteIndex(quoteIndex + 1);
  };

  const handleLikeQuote = () => {
    const newFavorite = { quote, author };
    setFavoriteQuotes([...favoriteQuotes, newFavorite]);
    setQuoteList([...quoteList, quote]);
    setAuthorList([...authorList, author]);
    setLiked(true);
  };

  const handleUnlikeQuote = () => {
    const index = favoriteQuotes.findIndex(
      (q) => q.quote === quote && q.author === author
    );
    if (index !== -1) {
      setFavoriteQuotes(favoriteQuotes.filter((_, i) => i !== index));
      setQuoteList(quoteList.filter((_, i) => i !== index));
      setAuthorList(authorList.filter((_, i) => i !== index));
    }
    setLiked(false);
  };

  const handleHeartClick = () => {
    if (liked) {
      handleUnlikeQuote();
    } else {
      handleLikeQuote();
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setSuccessAlertVisible(false);
      setLogoutMessage("Logged out successfully. You are now a guest.");
      setIsLoggedIn(false);
      setQuoteIndex(-1);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleTrashModalDelete = (quoteRemove: string) => {
    const deleteIndex = quoteList.indexOf(quoteRemove);
    if (deleteIndex !== -1) {
      const updatedFavorites = [...favoriteQuotes];
      updatedFavorites.splice(deleteIndex, 1);
      setFavoriteQuotes(updatedFavorites);

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

  const handleAIButton = () => {
    setIsAIGenerated(true);
    generateAIQuote();
    setQuoteIndex(quoteIndex + 1);
  };

  const generateAIQuote = () => {
    const aiQuote = generateUniqueAIQuote();
    setQuote(aiQuote);
    setAuthor("Claude AI");
    setLiked(false);
  };

  const generateUniqueAIQuote = () => {
    const themes = [
      "success",
      "perseverance",
      "innovation",
      "leadership",
      "growth",
      "creativity",
      "resilience",
      "courage",
      "wisdom",
      "change",
    ];
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];

    const quoteTemplates = [
      `The key to ${randomTheme} is not waiting for the perfect moment, but making every moment count.`,
      `${
        randomTheme.charAt(0).toUpperCase() + randomTheme.slice(1)
      } is not about being the best, it's about being better than you were yesterday.`,
      `In the journey of ${randomTheme}, it's not about the destination, but the transformation along the way.`,
      `True ${randomTheme} comes from embracing challenges as opportunities for growth.`,
      `The greatest catalyst for ${randomTheme} is the belief in your own potential.`,
      `${
        randomTheme.charAt(0).toUpperCase() + randomTheme.slice(1)
      } is not born from comfort, but from pushing beyond your limits.`,
      `The path to ${randomTheme} is paved with persistence, passion, and an unwavering vision.`,
      `In the realm of ${randomTheme}, your biggest competitor is the person you were yesterday.`,
      `${
        randomTheme.charAt(0).toUpperCase() + randomTheme.slice(1)
      } is not about avoiding failure, but learning to dance with uncertainty.`,
      `The seeds of ${randomTheme} are planted in the soil of curiosity and watered with determination.`,
    ];

    const randomTemplate =
      quoteTemplates[Math.floor(Math.random() * quoteTemplates.length)];
    return randomTemplate;
  };

  // Function to handle adding guest favorites to the user's private list
  const handleAddGuestFavorites = () => {
    setFavoriteQuotes([...favoriteQuotes, ...guestFavorites]);
    setQuoteList([...quoteList, ...guestFavorites.map((fq) => fq.quote)]);
    setAuthorList([...authorList, ...guestFavorites.map((fq) => fq.author)]);
    localStorage.removeItem("guestFavorites");
    setShowGuestFavoritesModal(false);
    setGuestFavorites([]);
  };

  // Function to handle closing the modal without adding favorites
  const handleCloseGuestFavoritesModal = () => {
    localStorage.removeItem("guestFavorites");
    setShowGuestFavoritesModal(false);
    setGuestFavorites([]);
  };

  return (
    <>
      {error && (
        <Alert type="danger" message={error} onClose={() => setError("")} />
      )}
      {successAlertVisible && (
        <Alert
          type="success"
          message={
            <>
              You are signing in as <strong>{signedInUsername}</strong>
            </>
          }
          onClose={() => setSuccessAlertVisible(false)}
        />
      )}
      {logoutMessage && (
        <Alert
          type="success"
          message={logoutMessage}
          onClose={() => setLogoutMessage("")}
        />
      )}
      <div className="text-center">
        <Heading>Motivational Quotes Generator</Heading>
        <SubHeading>Made by: Suppleo</SubHeading>

        {isButtonClicked ? (
          <GrayButton>Generating...</GrayButton>
        ) : (
          <GenerateButton onClick={handleGenerateClick} />
        )}

        <SaveListButton>Favorite Quotes</SaveListButton>
        <Button
          type="dark"
          onClick={handleAIButton}
          message="AI-Generated Quote"
        />

        {isLoggedIn ? <LogoutButton onclick={handleLogout} /> : <LoginButton />}
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
        isLoggedIn={isLoggedIn}
      />

      <GuestFavoritesModal
        show={showGuestFavoritesModal && isLoggedIn}
        onHide={handleCloseGuestFavoritesModal}
        guestFavorites={guestFavorites}
        onAddToPrivateList={handleAddGuestFavorites}
      />
    </>
  );
}

export default App;
