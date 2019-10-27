import sys
import json
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def get_premiumYearly_from_index(index):
	return df[df.index == index]["premiumYearly"].values[0]

def get_coverInL_from_index(index):
	return df[df.index == index]["coverInL"].values[0]

def get_companyName_from_index(index):
	return df[df.index == index]["companyName"].values[0]

def get_policyName_from_index(index):
	return df[df.index == index]["policyName"].values[0]

def get_index_from_policyName(policy):
	return df[df.policyName == policy]["index"].values[0]

df = pd.read_csv("medicalInsurance.csv")

features = ['companyName','premiumYearly','coverInL','cashlessHospitals']

for feature in features:
	df[feature] = df[feature].fillna('')

def combine_features(row):
	try:
		return str(row['companyName'])+" "+str(row["premiumYearly"])+" "+str(row["coverInL"])+" "+str(row["cashlessHospitals"])
	except:
		print("Error")

df["combined_features"] = df.apply(combine_features,axis=1)

cv = CountVectorizer()

count_matrix = cv.fit_transform(df["combined_features"])

cosine_sim = cosine_similarity(count_matrix)
policy_user_likes = sys.argv[1]

policy_index = get_index_from_policyName(policy_user_likes)

similar_policies =  list(enumerate(cosine_sim[policy_index]))

sorted_similar_policies = sorted(similar_policies,key=lambda x:x[1],reverse=True)

x=[]

i=0
for element in sorted_similar_policies:
		a = dict(srNo=i+1,
			index=element[0],
			policyName=get_policyName_from_index(element[0]),
			companyName=get_companyName_from_index(element[0]),
			coverInL=int(get_coverInL_from_index(element[0])),
			premiumYearly=int(get_premiumYearly_from_index(element[0])))
		x.append(a)
		i=i+1
		if i>9:
			break
print(json.dumps(x))