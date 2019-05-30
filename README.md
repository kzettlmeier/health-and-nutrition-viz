# health-and-nutrition-viz
CSC 595 Data Visualization Web Development Final Project

## To Run
You must have python installed to use the Flask server to serve the CSV file under [app/data/nhanes_dataset.csv](app/data/nhanes_dataset.csv).  In order to install flask you can run the following:
```bash
pip install Flask
```
Once you have Flask installed you can run the web server via the following:
**Windows:**
```shell
run_server.bat
```
**Mac/Linux:**
```bash
./run_server.sh
```

## Dataset
If you want to add data to the CSV, download the CSV from [Kaggle](https://www.kaggle.com/cdc/national-health-and-nutrition-examination-survey).  Place the column in the correct worksheet in the [combined.xlsx](combined.xlsx) spreadsheet.  You can then go to the combined worksheet and add the column by doing a VLOOKUP to match the SEQN number, if you have trouble you can take one of the previous columns as an example.  Then you can copy the column and add it to the [nhanes_dataset.csv](app/data/nhanes_dataset.csv) by pasting it by value instead of reference so you won't copy the formula.