function isYoutubeUrl(url) {
    try {
      const parsed = new URL(url);
      console.log("parsed", parsed);
      const hostname = parsed.hostname.toLowerCase();
      console.log(hostname);
      if (hostname === "youtube.com" || hostname === "www.youtube.com") {
        return (
          (parsed.pathname.startsWith("/watch") &&
            parsed.searchParams.has("v")) ||
          parsed.pathname.startsWith("/embed/")
        );
      } else if (hostname === "youtu.be") {
        return parsed.pathname.length > 1; // Ensures there's a video ID
      }
      return false;
    } catch (e) {
      return false; // Invalid URL
    }
  }

  function getVideoId(url) {
    try {
      const parsed = new URL(url);
      console.log("parsed", parsed);
      const hostname = parsed.hostname.toLowerCase();
      console.log(hostname);
      if (hostname === "youtube.com" || hostname === "www.youtube.com") {
        if (
          parsed.pathname.startsWith("/watch") &&
          parsed.searchParams.has("v")
        ) {
          return parsed.searchParams.get("v") || null;
        } else if (parsed.pathname.startsWith("/embed/")) {
          return parsed.pathname.split("/embed/")[1].split("/")[0];
        }
      } else if (hostname === "youtu.be") {
        return parsed.pathname.split("/")[1] || null;
      }
      return null;
    } catch (e) {
      return null; // Invalid URL
    }
  }
  


  export {isYoutubeUrl, getVideoId};