const myPromise = new Promise((resolve, reject) => {
    const condition = true;
    if (condition) {
      resolve("success");
    } else {
      reject("error");
    }
  });
  

  async function getResult() {
    try {
      const result = await myPromise;
      console.log("Promise resolved:", result);
    } catch (error) {
      console.error("Promise rejected:", error);
    }
  }
  
  getResult();
  