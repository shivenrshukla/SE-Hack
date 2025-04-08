const analysisSchema = new mongoose.Schema({
    // Database scheme
});
  
const Analysis = mongoose.model("Analysis", analysisSchema);


module.exports = Analysis;