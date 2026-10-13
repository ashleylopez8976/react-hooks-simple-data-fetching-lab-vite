// create your App component here
import { useEffect, useState } from "react";

function App() {
  const [dogImage, setDogImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch a dog on the first load and whenever the button is clicked.
  async function fetchDog() {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://dog.ceo/api/breeds/image/random"
      );

      if (!response.ok) {
        throw new Error("Could not fetch a dog image.");
      }

      const data = await response.json();
      setDogImage(data.message);
    } catch (error) {
      setError("Unable to load a dog image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  // The empty dependency array runs this effect when App mounts.
  useEffect(() => {
    fetchDog();
  }, []);

  return (
    <main>
      <h1>Random Dog Images</h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : (
        <img src={dogImage} alt="Random dog" />
      )}

      <button onClick={fetchDog} disabled={isLoading}>
        Get New Dog
      </button>
    </main>
  );
}

export default App;