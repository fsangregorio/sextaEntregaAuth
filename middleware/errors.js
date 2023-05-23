
const error = (err, req, res, next) => {
    if (err?.message.includes("Error")) {
      console.log(err.stack);
      return res.status(404).json({ message: err.message });
    } else if (err?.name.includes("Error")) {
      console.log(err.stack);
      return res.status(400).json({ message: err.issues });
    }
    console.log(err.stack);
    return res.status(500).json({ message: "Error" });
  };
  
  export default error;
  