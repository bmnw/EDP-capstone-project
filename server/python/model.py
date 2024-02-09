import pandas as pd
import numpy as np
import sys

location = sys.argv[1]
role = sys.argv[2]

def runModel():
    model = pd.read_pickle(r'C:\Users\wasadmin\Desktop\EDP-capstone-project\server\python\trained_model.pkl')
    staff_data = pd.read_csv(r'C:\Users\wasadmin\Desktop\EDP-capstone-project\server\python\staff.csv')

    X = staff_data[['location','role']]

    inputs_array = np.array([[location, role]])
    inputs_df = pd.DataFrame(inputs_array)
    inputs_df.columns = ['location','role']

    X = pd.concat([X, inputs_df], ignore_index=True)
    encoded_list = pd.get_dummies(X)

    prediction = model.predict(encoded_list)
    # woohoo!
    salary_prediction = int(prediction[-1][0])
    print(salary_prediction)
    return salary_prediction
    # print(X.tail(5))

runModel()