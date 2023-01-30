#Import Dependencies
import requests
import pandas as pd
#from config import api_key
from pprint import pprint
from sqlalchemy import create_engine,text
from sqlalchemy import inspect
from password import pw
from flask_cors import CORS
from flask import Flask, jsonify, render_template

#Add this line to get rid of warning messages
pd.options.mode.chained_assignment = None  # default='warn'

base_url = 'https://api.data.abs.gov.au/data/'

# GetData Required Parameters, explore.data.abs.gov.au for finding parameter values for a sepcific dataset
dataflowIdentifier = "ABS,RES_DWELL_ST,1.0.0"
dataKey = ""

# GetData Query Parameters, the default format is XML, uses SDMX
format = "format=jsondata"
detail = "detail=dataonly"

###API CALL
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

###DATA TRANSFORMATION CODE
######AP New code start
mean_aus_dwelling = series['4:3:0']['observations']
mean_nsw_dwelling= series['4:5:0']['observations'] 
mean_vic_dwelling= series['4:7:0']['observations']
mean_qsw_dwelling= series['4:2:0']['observations']
mean_sa_dwelling=  series['4:0:0']['observations']
mean_wa_dwelling=  series['4:6:0']['observations']
mean_ts_dwelling=  series['4:8:0']['observations']
mean_nt_dwelling=  series['4:4:0']['observations']
mean_act_dwelling= series['4:1:0']['observations']

######AP New code start

# Convert JSON data into a DataFrame
aus_df = pd.DataFrame.from_dict(mean_aus_dwelling, orient='index', columns=['mean_price'])
nsw_df = pd.DataFrame.from_dict(mean_nsw_dwelling, orient='index', columns=['mean_price'])
vic_df = pd.DataFrame.from_dict(mean_vic_dwelling, orient='index', columns=['mean_price'])
qsw_df = pd.DataFrame.from_dict(mean_qsw_dwelling, orient='index', columns=['mean_price'])
sa_df = pd.DataFrame.from_dict(mean_sa_dwelling, orient='index', columns=['mean_price'])
wa_df = pd.DataFrame.from_dict(mean_wa_dwelling, orient='index', columns=['mean_price'])
ts_df = pd.DataFrame.from_dict(mean_ts_dwelling, orient='index', columns=['mean_price'])
nt_df = pd.DataFrame.from_dict(mean_nt_dwelling, orient='index', columns=['mean_price'])
act_df = pd.DataFrame.from_dict(mean_act_dwelling, orient='index', columns=['mean_price'])

####
# Extract the last character of the index to represent the quarter
aus_df.index = aus_df.index.str[-1]
nsw_df.index = nsw_df.index.str[-1]
vic_df.index = vic_df.index.str[-1]
qsw_df.index = qsw_df.index.str[-1]
sa_df.index = sa_df.index.str[-1]
wa_df.index = wa_df.index.str[-1]
ts_df.index = ts_df.index.str[-1]
nt_df.index = nt_df.index.str[-1]
act_df.index = act_df.index.str[-1]

# Create a PeriodIndex for the time period with a frequency of 'Q' for quarters
time_period = pd.date_range(start='2011-07-01', periods=45, freq='Q')

##Data Trasnformation for All Australia 
aus_df.set_index(time_period.to_period('Q'), inplace=True)
aus_df.index.name = 'time period'
aus_df.index = aus_df.index.strftime('%Y-Q%q')
aus_df.reset_index(inplace=True)
aus_df.insert(0, 'id', range(1, 1+len(aus_df)))
aus_df = aus_df.rename(columns={'time period': 'time_period', 'mean price of residential dwelling': 'mean_price'})
aus_df.set_index('id',inplace=True)

##Data Trasnformation for NSW
nsw_df.set_index(time_period.to_period('Q'), inplace=True)
nsw_df.index.name = 'time period'
nsw_df.index = nsw_df.index.strftime('%Y-Q%q')
nsw_df.reset_index(inplace=True)
nsw_df.insert(0, 'id', range(1, 1+len(nsw_df)))
nsw_df = nsw_df.rename(columns={'time period': 'time_period', 'mean price of residential dwelling': 'mean_price'})
nsw_df.set_index('id',inplace=True)

##Data Trasnformation for VIC
vic_df.set_index(time_period.to_period('Q'), inplace=True)
vic_df.index.name = 'time period'
vic_df.index = vic_df.index.strftime('%Y-Q%q')
vic_df.reset_index(inplace=True)
vic_df.insert(0, 'id', range(1, 1+len(vic_df)))
vic_df = vic_df.rename(columns={'time period': 'time_period', 'mean price of residential dwelling': 'mean_price'})
vic_df.set_index('id',inplace=True)


##Data Trasnformation for QSW
qsw_df.set_index(time_period.to_period('Q'), inplace=True)
qsw_df.index.name = 'time period'
qsw_df.index = qsw_df.index.strftime('%Y-Q%q')
qsw_df.reset_index(inplace=True)
qsw_df.insert(0, 'id', range(1, 1+len(qsw_df)))
qsw_df = qsw_df.rename(columns={'time period': 'time_period', 'mean price of residential dwelling': 'mean_price'})
qsw_df.set_index('id',inplace=True)


##Data Trasnformation for SA
sa_df.set_index(time_period.to_period('Q'), inplace=True)
sa_df.index.name = 'time period'
sa_df.index = sa_df.index.strftime('%Y-Q%q')
sa_df.reset_index(inplace=True)
sa_df.insert(0, 'id', range(1, 1+len(sa_df)))
sa_df = sa_df.rename(columns={'time period': 'time_period', 'mean price of residential dwelling': 'mean_price'})
sa_df.set_index('id',inplace=True)

##Data Trasnformation for WA
wa_df.set_index(time_period.to_period('Q'), inplace=True)
wa_df.index.name = 'time period'
wa_df.index = wa_df.index.strftime('%Y-Q%q')
wa_df.reset_index(inplace=True)
wa_df.insert(0, 'id', range(1, 1+len(wa_df)))
wa_df = wa_df.rename(columns={'time period': 'time_period', 'mean price of residential dwelling': 'mean_price'})
wa_df.set_index('id',inplace=True)


##Data Trasnformation for TS
ts_df.set_index(time_period.to_period('Q'), inplace=True)
ts_df.index.name = 'time period'
ts_df.index = ts_df.index.strftime('%Y-Q%q')
ts_df.reset_index(inplace=True)
ts_df.insert(0, 'id', range(1, 1+len(ts_df)))
ts_df = ts_df.rename(columns={'time period': 'time_period', 'mean price of residential dwelling': 'mean_price'})
ts_df.set_index('id',inplace=True)

##Data Trasnformation for NT
nt_df.set_index(time_period.to_period('Q'), inplace=True)
nt_df.index.name = 'time period'
nt_df.index = nt_df.index.strftime('%Y-Q%q')
nt_df.reset_index(inplace=True)
nt_df.insert(0, 'id', range(1, 1+len(nt_df)))
nt_df = nt_df.rename(columns={'time period': 'time_period', 'mean price of residential dwelling': 'mean_price'})
nt_df.set_index('id',inplace=True)

##Data Trasnformation for ACT
act_df.set_index(time_period.to_period('Q'), inplace=True)
act_df.index.name = 'time period'
act_df.index = act_df.index.strftime('%Y-Q%q')
act_df.reset_index(inplace=True)
act_df.insert(0, 'id', range(1, 1+len(act_df)))
act_df = act_df.rename(columns={'time period': 'time_period', 'mean price of residential dwelling': 'mean_price'})
act_df.set_index('id',inplace=True)

aus_df["region"]='AUST' 
nsw_df["region"]='NSW' 
vic_df["region"]='VIC' 
qsw_df["region"]='QLD' 
sa_df["region"]='SA' 
wa_df["region"]='WA' 
ts_df["region"]='TAS' 
nt_df["region"]='NT' 
act_df["region"]='ACT'

###DATABASE CONNECTIVITY CODE 
#connect to local database 
protocol = 'postgresql'
username = 'postgres'
password = 'postgres123'
host = 'localhost'
port = 5432

# connect to cloud database using SQLAlchemy
#protocol = 'postgresql'
#username = 'anshumanp'
#password = 'Anshuman123'
#host = 'mydbinstance-anshu.c3y42tkkiinb.us-east-2.rds.amazonaws.com'
#port = 5432

database_name = 'rates_db'
rds_connection_string = f'{protocol}://{username}:{password}@{host}:{port}/{database_name}'
engine = create_engine(rds_connection_string)
insp = inspect(engine)

# Load DataFrames into Postgres Database
#aus_df.to_sql(name='resident_dwelling_mean_price', con=engine, if_exists='replace', index=False)
aus_df.to_sql(name="resident_dwelling_mean_price",con=engine,if_exists="append",index=True)
nsw_df.to_sql(name="resident_dwelling_mean_price",con=engine,if_exists="append",index=True)
vic_df.to_sql(name="resident_dwelling_mean_price",con=engine,if_exists="append",index=True)
qsw_df.to_sql(name="resident_dwelling_mean_price",con=engine,if_exists="append",index=True)
sa_df.to_sql(name="resident_dwelling_mean_price",con=engine,if_exists="append",index=True)
wa_df.to_sql(name="resident_dwelling_mean_price",con=engine,if_exists="append",index=True)
ts_df.to_sql(name="resident_dwelling_mean_price",con=engine,if_exists="append",index=True)
nt_df.to_sql(name="resident_dwelling_mean_price",con=engine,if_exists="append",index=True)
act_df.to_sql(name="resident_dwelling_mean_price",con=engine,if_exists="append",index=True)


###lOGIC FOR FLASK
app = Flask(__name__)
CORS(app)
app.config['TEMPLATES_AUTO_RELOAD'] = True

# define a route to retrieve data from the database and serve it as a JSON response
@app.route('/resdwelling/mean')
def mean():
    # Query the database
    query = 'select * from resident_dwelling_mean_price'
    resdwelling_mean_df = pd.read_sql_query(query, con=engine)
    # Convert the data to a JSON object
    data = resdwelling_mean_df.to_json(orient='records', force_ascii=False)
    return jsonify(data)

@app.route("/")
def index():
    query = text("""
            select region,avg(mean_price) as sort_column, '$'||to_char(avg(mean_price*1000),'FM999999999.00') AS avg_mean_price
            from resident_dwelling_mean_price 
            where time_period like '2022%'
            and region <> 'AUST'
            group by region 
            order by 2 desc
            """)
    data = engine.execute(query)
    return render_template("index.html", data=data)
    #return jsonify([dict(_) for _ in results])

      # retrieve data from the database
      # data = retrieve_data_from_db()
      # render the template and pass the data as a variable
      # return render_template('index.html', data=data)
@app.route("/")
def index_1():
    query = text("""
            select time_period,region from resident_dwelling_mean_price
            order by time_period,region
            where region <> 'AUST'
            """)
    data_1 = engine.execute(query)
    return render_template("index.html", data_1=data_1)
    #return jsonify([dict(_) for _ in results])

      # retrieve data from the database
      # data = retrieve_data_from_db()
      # render the template and pass the data as a variable
      # return render_template('index.html', data=data)      

if __name__ == '__main__':
    app.run(debug=True)
