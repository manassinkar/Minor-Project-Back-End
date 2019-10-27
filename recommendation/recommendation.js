exports.recommend = (req,res) =>
{
    var spawn = require('child_process').spawn;
    var recommendationPythonScript = "policy_recommendation.py";
    var process = spawn('python',[recommendationPythonScript,req.query.policyName] ); 
    process.stdout.on('data', function(data)
    {
        data = data.toString();
        data = JSON.parse(data);
        console.log(data);
        res.send(data); 
    });
}