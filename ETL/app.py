# dependencies
from flask import Flask, jsonify
from bs4 import BeautifulSoup
import requests
import pandas as pd
from sqlalchemy import create_engine
from sqlalchemy import inspect
from flask_cors import CORS

## RBA SCRAPE to DataFram 'rba_df'
# Make a request to the RBA website
url = 'https://www.rba.gov.au/statistics/cash-rate/'
response = requests.get(url)

# Parse the HTML content
soup = BeautifulSoup(response.content, 'html.parser')

# Find the table containing the interest rate data
table = soup.find('table', {'id': 'datatable','class': 'table-linear table-numeric'})

# Initialize an empty list to store the data
data = []

# Extract the data from the table
for row in table.find_all('tr'):
    cells = row.find_all(['th','td'])
    if len(cells) == 4:
        date = cells[0].text.strip()
        change = cells[1].text.strip()
        rate = cells[2].text.strip()
        data.append([date, change, rate])
    else:
        continue
        
# Create a pandas DataFrame
rba_df = pd.DataFrame(data[1:], columns=data[0])
rba_df.columns = ["date", "change_pct", "cash_rate_pct"]

# Convert the date column to datetime then to YYYY-MM-DD format
rba_df['date'] = pd.to_datetime(rba_df['date'], format='%d %b %Y')
rba_df['date'] = rba_df['date'].dt.strftime('%Y-%m-%d')

# Filter date column to only show dates after 30th September 2011
rba_df = rba_df[rba_df['date'] > '2011-09-30']

## ABS API to DataFrame 'aus_df'
# base URL
base_url = 'https://api.data.abs.gov.au/data/'

# GetData Required Parameters, explore.data.abs.gov.au for finding parameter values for a sepcific dataset
dataflowIdentifier = "ABS,RES_DWELL_ST,1.0.0"
dataKey = ""

# GetData Query Parameters, the default format is XML, uses SDMX
format = "format=jsondata"
detail = "detail=dataonly"

# Request URL
url = base_url + f"{dataflowIdentifier}/{dataKey}?{detail}&{format}"
response = requests.get(url)
if response.status_code == 200:
    # Successful API call
    json_data = response.json()
else:
    # Handle unsuccessful API call
    print("Error: Failed to fetch data from ABS website.")

# find the data using the path
series = json_data['data']['dataSets'][0]['series']

# locate series of interest
mean_aus_dwelling = series['4:3:0']['observations']

# Convert JSON data into a DataFrame
aus_df = pd.DataFrame.from_dict(mean_aus_dwelling, orient='index', columns=['mean price of residential dwelling'])

# Create a PeriodIndex for the time period with a frequency of 'Q' for quarters
time_period = pd.date_range(start='2011-07-01', periods=45, freq='Q')

# Convert the date to YYYY-MM-DD format
time_period = time_period.strftime('%Y-%m-%d')

# Add the date column to the DataFrame
aus_df['date'] = time_period

# Rename the columns
aus_df = aus_df.rename(columns={'mean price of residential dwelling': 'mean_price'})

# connect to cloud database using SQLAlchemy
protocol = 'postgresql'
username = 'postgres'
password = 'postgres'
host = 'localhost'
port = 5432
database_name = 'rates_db'
rds_connection_string = f'{protocol}://{username}:{password}@{host}:{port}/{database_name}'
engine = create_engine(rds_connection_string)
insp = inspect(engine)

# Load DataFrames into Postgres Database
rba_df.to_sql(name='interest_rates', con=engine, if_exists='replace', index=False)
aus_df.to_sql(name='aus_dwelling_mean', con=engine, if_exists='replace', index=False)

app = Flask(__name__)
CORS(app)

# define a route to retrieve data from the database and serve it as a JSON response
@app.route('/rba/data')
def data1():
    # Query the database
    query = 'SELECT date, change_pct, cash_rate_pct FROM interest_rates'
    rba_df = pd.read_sql_query(query, con=engine)
    # Convert the data to a JSON object
    data = rba_df.to_json(orient='records', force_ascii=False)
    return jsonify(data)

# define a route to retrieve data from the database and serve it as a JSON response
@app.route('/abs/data')
def data2():
    # Query the database
    query = 'SELECT date, mean_price FROM aus_dwelling_mean'
    aus_df = pd.read_sql_query(query, con=engine)
    # Convert the data to a JSON object
    data = aus_df.to_json(orient='records', force_ascii=False)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
