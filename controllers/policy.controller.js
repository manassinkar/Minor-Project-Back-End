const Policy = require('../models/policy.model');
const { Parser } = require('json2csv');
var fs = require('fs');

exports.addPolicy = (req,res) =>
{
    Policy.find({},(err,ans) =>
    {
        if(err)
        {
            res.status(500).send({ message: 'Error while adding policy', error:err });
        }
        else
        {
            if(ans)
            {
                var nindex = ans[0].index + 1;
            }
            else
            {
                nindex = 0;
            }
            var policy = new Policy(
                {
                    index: nindex,
                    policyName: req.body.policyName,
                    companyName: req.body.companyName,
                    coverInL: req.body.coverInL,
                    cashlessHospitals: req.body.cashlessHospitals,
                    premiumMonthly: req.body.premiumMonthly,
                    premiumYearly: req.body.premiumYearly
                }
            );
            policy.save((er) =>
            {
                if(er)
                {
                    res.status(500).send({ message: 'Error while adding policy', error:err });
                }
                else
                {
                    var newLine= "\r\n";
                    var fields = ['index', 'policyName','companyName','coverInL','cashlessHospitals','premiumMonthly','premiumYearly'];
                    fs.stat('medicalInsurance.csv', function (err, stat) {
                        if (err == null) 
                        {
                            var toCsv = 
                            {
                                index: nindex+1,
                                policyName: req.body.policyName,
                                companyName: req.body.companyName,
                                coverInL: req.body.coverInL,
                                cashlessHospitals: req.body.cashlessHospitals,
                                premiumMonthly: req.body.premiumMonthly,
                                premiumYearly: req.body.premiumYearly
                            }
                            const parser = new Parser();
                            const csv = parser.parse(toCsv);
                            var x = csv.indexOf("Yearly");
                            x=x+8;
                            var y = csv.length;
                            var csvNew = csv.substring(x,y);
                            csvNew = csvNew.replace(/['"]+/g, '');
                            fs.appendFile('medicalInsurance.csv', csvNew, function (err) {
                                if (err)
                                {
                                    Policy.deleteOne({ index: nindex },(err) =>
                                    {
                                        if(err)
                                        {
                                            res.status(500).send({ message: 'Error while adding to Recommendation Dataset, but policy added to database' });
                                        }
                                        else
                                        {
                                            res.status(500).send({ message: 'Error while adding to Recommendation Dataset, Hence Policy not added' });
                                        }
                                    });
                                }
                                else
                                {
                                    console.log('The "data to append" was appended to file!');
                                    res.status(200).send({ message: 'Policy Added Successfully' })
                                }
                            });
                        }
                        else 
                        {
                            fields = (fields + newLine);
                            fields = fields.replace(/['"]+/g, '');
                            fs.writeFile('medicalInsurance.csv', fields, function (err) {
                                if (err)
                                {
                                    Policy.deleteOne({ index: nindex },(err) =>
                                    {
                                        if(err)
                                        {
                                            res.status(500).send({ message: 'Error while adding to Recommendation Dataset, but policy added to database' });
                                        }
                                        else
                                        {
                                            res.status(500).send({ message: 'Error while adding to Recommendation Dataset, Hence Policy not added' });
                                        }
                                    });
                                }
                                else
                                {
                                    console.log('file saved');
                                    res.status(200).send({ message: 'Policy Added Successfully' });
                                }
                            });
                        }
                    });
                }
            });
        }
    }).sort({_id:-1}).limit(1);
};

exports.viewPolicy = (req,res) =>
{
    Policy.find({},(err,ans) =>
    {
        if(err)
        {
            res.status(500).send({ message: 'Error while fetching policies', error:err });
        }
        else
        {
            res.status(200).send(ans);
        }
    });
}