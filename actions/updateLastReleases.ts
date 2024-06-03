import lastReleasesFetch from "./lastReleasesFetch";

const startCounter = () => {
  if (typeof window !== "undefined") {
    let counter = parseInt(localStorage.getItem("counter") || "0", 10);

    const updateCounter = async () => {
      if (typeof window !== "undefined") {
        counter++;
        localStorage.setItem("counter", counter.toString());
        console.log(`Counter value: ${counter}`);

        if (counter >= 1800000) {
          console.log("Counter reached 1800, performing the operation.");
          // Operation
          lastReleasesFetch();
          // Restart the counter when the operation is performed
          counter = 0;
          localStorage.setItem("counter", counter.toString());
        }
      }

      setInterval(updateCounter, 1000);
    };
  } else {
    console.log("LocalStorage unavailable !");
  }
};

export default startCounter;
