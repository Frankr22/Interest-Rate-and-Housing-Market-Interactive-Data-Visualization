# Dependencies
import requests
from pprint import pprint
import json
import pandas as pd
from sqlalchemy import create_engine
from sqlalchemy import inspect
from flask_cors import CORS

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
    # Do something with the data
    pprint(json_data)
else:
    # Handle unsuccessful API call
    print("Error: Failed to fetch data from ABS website.")

# find the data using the path
series = json_data['data']['dataSets'][0]['series']

# locate series of interest
mean_aus_dwelling = series['4:3:0']['observations']

# Convert JSON data into a DataFrame
aus_df = pd.DataFrame.from_dict(mean_aus_dwelling, orient='index', columns=['mean price of residential dwelling'])

# Extract the last character of the index to represent the quarter
aus_df.index = aus_df.index.str[-1]

# Create a PeriodIndex for the time period with a frequency of 'Q' for quarters
time_period = pd.date_range(start='2011-07-01', periods=45, freq='Q')

# Set the index of the DataFrame as the time period
aus_df.set_index(time_period.to_period('Q'), inplace=True)
aus_df.index.name = 'time period'
aus_df.index = aus_df.index.strftime('%Y-Q%q')

aus_df.reset_index(inplace=True)
aus_df.insert(0, 'id', range(1, 1+len(aus_df)))
aus_df = aus_df.rename(columns={'time period': 'time_period', 'mean price of residential dwelling': 'mean_price'})
aus_df.head()

# connect to cloud database using SQLAlchemy
protocol = 'postgresql'
username = 'anshumanp'
password = 'Anshuman123'
host = 'mydbinstance-anshu.c3y42tkkiinb.us-east-2.rds.amazonaws.com'
port = 5432
database_name = 'rates_db'
rds_connection_string = f'{protocol}://{username}:{password}@{host}:{port}/{database_name}'
engine = create_engine(rds_connection_string)
insp = inspect(engine)

# Confirm tables
insp.get_table_names()

# Confirm tables
insp.get_table_names()

# Load DataFrame into Postgres Database
df.to_sql(name='aus_dwelling_mean', con=engine, if_exists='append', index=False)

# Test Database with SQL Query
pd.read_sql_query('SELECT * from aus_dwelling_mean LIMIT 10', con=engine).head()