import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import arrowIcon from "../assets/arrow2.png";
import errorIcon from "../assets/error.png";
import Footer from "./Footer";
import { isYoutubeUrl, getVideoId } from "../utils/youtubeUtils";

const LandingPage = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [noSpoilers, setNoSpoilers] = useState(false); // State for no-spoilers switch
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { sessionId: urlSessionId } = useParams();

  const handleChange = (url) => {
    setUrl(url);
    if (url.length === 0) {
      setError("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent newline
      handleSubmit(e); // Trigger form submission
    }
  };

  const handleToggleNoSpoilers = () => {
    setNoSpoilers((prev) => !prev);
    console.log("No Spoilers toggled:", !noSpoilers); // Debug log
  };

  useEffect(() => {
    if (urlSessionId) {
      navigate(`/conversation/${urlSessionId}`, { replace: true });
    }
  }, [urlSessionId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Form submitted with URL:", url, "No Spoilers:", noSpoilers);

    if (!url) {
      setError("Please enter a YouTube URL");
      return;
    }

    if (!isYoutubeUrl(url)) {
      setError("Invalid video URL");
      return;
    }

    const videoId = getVideoId(url);
    console.log("Video ID:", videoId);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/llm`, {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoId, noSpoilers }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      const sessionId = data.sessionId;
      console.log("Session ID:", sessionId);
      console.log("API response:", data);
      setLoading(false);
      navigate(`/conversation/${sessionId}`, {
        state: { videoData: data, noSpoilers: noSpoilers },
      });
    } catch (error) {
      console.error("Error calling the API:", error);
      setError("Failed to process the video");
    }

    setUrl("");
  };

  return (
    <div className="max-w-full min-h-screen overflow-y-hidden flex flex-col w-6xl">
      <div className="flex flex-grow items-center justify-center w-full py-20">
        <main className="max-w-2xl w-full mx-4 pt-20 pb-12 px-6 rounded-lg ">
          <section className="text-center mb-8">
            <h3 className="font-semibold text-gray-800 mb-3 text-4xl">
              What are we watching today?
            </h3>
          </section>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 justify-center items-center"
          >
            <div className="w-full bg-white flex flex-col border-gray-300 border-1 rounded-2xl">
              <label htmlFor="url" className="sr-only">
                YouTube URL
              </label>
              <input
                type="text"
                id="url"
                onKeyDown={handleKeyDown}
                name="url"
                autoComplete="off"
                value={url}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="Paste a YouTube URL to begin"
                className="w-full px-7 py-5 text-gray-900 focus:outline-none text-md rounded-t-2xl border-b-2 border-gray-200"
              />
              <div className="flex flex-row justify-between items-center px-4 py-2">
                {/* Error Message */}
                {error && (
                  <div className="flex items-center text-red-600 text-sm">
                    <img
                      src={errorIcon}
                      width="20px"
                      height="20px"
                      alt="Error"
                      className="mr-2"
                    />
                    <p>{error}</p>
                  </div>
                )}

                {/* No Spoilers Switch */}
                <label className="flex items-center space-x-2 cursor-pointer">
                  <span className="text-sm text-gray-700 font-medium">
                    No Spoilers
                  </span>
                  <div className="relative inline-block w-10 h-5">
                    <input
                      type="checkbox"
                      id="no-spoilers"
                      checked={noSpoilers}
                      onChange={handleToggleNoSpoilers}
                      className="absolute opacity-0 w-0 h-0"
                    />
                    <span
                      className={`block w-10 h-5 rounded-full transition-colors duration-200 ease-in-out ${
                        noSpoilers ? "bg-blue-500" : "bg-gray-300"
                      }`}
                    ></span>
                    <span
                      className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-200 ease-in-out ${
                        noSpoilers ? "translate-x-5" : "translate-x-0"
                      }`}
                    ></span>
                  </div>
                </label>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-1.5 rounded-full focus:ring-4 focus:ring-blue-300 transition-all duration-200 disabled:bg-gray-300 hover:bg-blue-600 disabled:cursor-not-allowed"
                  disabled={!url}
                >
                  <img
                    src={arrowIcon}
                    width="30px"
                    height="30px"
                    alt="Submit"
                    className="p-1.5"
                  />
                </button>
              </div>
            </div>
          </form>
          <div
            className={`loading-div border-amber-500 w-full flex justify-center items-center pt-12 ${
              loading ? "" : "hidden"
            }`}
          >
            <div className="loader"></div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
