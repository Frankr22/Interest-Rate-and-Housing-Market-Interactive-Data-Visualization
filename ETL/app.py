# dependencies
from flask import Flask, jsonify
from bs4 import BeautifulSoup
import requests
import pandas as pd
from sqlalchemy import create_engine
from sqlalchemy import inspect
from flask_cors import CORS

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
df = pd.DataFrame(data[1:], columns=data[0])
df.columns = ["date", "change_pct", "cash_rate_pct"]

# Print the DataFrame
print(df)

app = Flask(__name__)
CORS(app)

# connect to database using SQLAlchemy
protocol = 'postgresql'
username = 'postgres'
password = 'postgres'
host = 'localhost'
port = 5432
database_name = 'rates_db'
rds_connection_string = f'{protocol}://{username}:{password}@{host}:{port}/{database_name}'
engine = create_engine(rds_connection_string)
insp = inspect(engine)

# Confirm tables
insp.get_table_names()

# Load DataFrame into Postgres Database
df.to_sql(name='interest_rates', con=engine, if_exists='append', index=False)

# Test Database with SQL Query
pd.read_sql_query('SELECT * from interest_rates LIMIT 100', con=engine).head()

# define a route to retrieve data from the database and serve it as a JSON response
@app.route('/api/data')
def data():
    # Query the database
    query = 'SELECT date, change_pct, cash_rate_pct FROM interest_rates'
    df = pd.read_sql_query(query, con=engine)
    # Convert the data to a JSON object
    data = df.to_json(orient='records', force_ascii=False)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
    