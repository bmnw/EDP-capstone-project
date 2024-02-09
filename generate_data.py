import pymongo
import faker
import random
import csv

# Create the CSV file
OUTPUT_FILE = "staff.csv"

fake = faker.Faker()

roles = ["employee", "employee","employee","manager", "hr"]
locations = ["Hartford", "St. Paul"]

def getSalary(role, location):
    money = 0
    if location == "Hartford":
        money += 5000
    if role == "employee":
        money += random.randint(80000, 100000)
    elif role == "manager":
        money += random.randint(120000, 150000)
    else:
        money += random.randint(90000, 115000)
    return money
employees = []

def getReports():
    reports = []
    if len(employees) == 0:
        return reports
    else:
        
        reports.append(employees.pop(0))
        reports.append(employees.pop(0))
        reports.append(employees.pop(0))
        return reports

def getRole(id):
    if id <= 600:
        return "employee"
    elif id <= 800:
        return "manager"
    else:
        return "hr"

def getPhonenumber():
    number = fake.phone_number()
    num = ""
    for i in number:
        if i == "x":
            return num
        else:
            num += i
    return num

data_rows = []
for i in range(1,1001):
    role = getRole(i)
    location = random.choice(locations)
    salary = getSalary(role,location)
    firstname = fake.first_name() 
    lastname = fake.last_name()
    name = firstname + " " + lastname
    username = firstname + lastname[0]
    password = "password"
    direct_reports = []
    phone_number = getPhonenumber()

    if role == "manager":
        direct_reports = getReports()

    data_row = [
        str(i),
        name,
        phone_number,
        role,
        location,
        salary,
        username.lower(),
        password,
        direct_reports

    ]
    data_rows.append(data_row)
    if role == "employee":
        employees.append(i)

with open(OUTPUT_FILE, "w", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(
        ["id", "name", "phone_number", "role", "location", "salary", "username",
         "password", "direct_reports"]
    )
    writer.writerows(data_rows)