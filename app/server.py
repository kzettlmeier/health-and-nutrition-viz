import csv
import random
from flask import Flask, send_from_directory
app = Flask(__name__)

reader = csv.reader(open("./app/data/nhanes_dataset.csv"))
header = reader.next()
stringData = [ row for row in reader ]

ageByGroupReader = csv.reader(open("./app/data/nhanes_dataset_agebygroup.csv"))
ageByGroupHeader = ageByGroupReader.next()
ageByGroupStringData = [ row for row in ageByGroupReader ]

# take a list of data rows and make CSV text
def dataToCSVStr(header, dataList):
    csvStr = ",".join(header) + "\n"
    strData = [ ",".join([str(x) for x in data])
        for data in dataList ]
    csvStr += "\n".join(strData)
    return csvStr

@app.route('/<path:path>')
def startup(path):
    return send_from_directory('.', path)

@app.route('/data')
def data():
    return dataToCSVStr(header, stringData)

@app.route('/ageByGroupData')
def ageByGroupData():
    return dataToCSVStr(ageByGroupHeader, ageByGroupStringData)

@app.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0'
    return r