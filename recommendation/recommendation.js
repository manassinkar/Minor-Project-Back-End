var fs = require('fs');
exports.recommend = (req,res) =>
{
    var exec = require('child_process').execSync;
    var recommendationPythonScript = "policy_recommendation.py";
    var z = req.query.policyIndex;
    var x = parseInt(z)+1;
    var process = exec('python '+recommendationPythonScript+' '+x.toString());
    var data = fs.readFileSync('recommendationData.txt',{encoding: 'utf-8'});
    res.status(200).send(JSON.parse(data));
}