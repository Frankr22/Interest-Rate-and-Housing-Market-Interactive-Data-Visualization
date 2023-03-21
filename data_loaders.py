import requests
import pandas as pd
from bs4 import BeautifulSoup

def load_rba_data():
    RBA_URL = 'https://www.rba.gov.au/statistics/cash-rate/'
    
    def fetch_rba_data(url):
        try:
            response = requests.get(url)
            response.raise_for_status()
            return response.content
        except requests.exceptions.RequestException as e:
            print(f"Error fetching RBA data: {e}")
            return None

    def parse_rba_data(html_content):
        soup = BeautifulSoup(html_content, 'html.parser')
        table = soup.find('table', {'id': 'datatable', 'class': 'table-linear table-numeric'})
        data = []

        for row in table.find_all('tr'):
            cells = row.find_all(['th', 'td'])
            if len(cells) == 4:
                date = cells[0].text.strip()
                change = cells[1].text.strip()
                rate = cells[2].text.strip()
                data.append([date, change, rate])
        
        return data

    def create_rba_dataframe(data):
        rba_df = pd.DataFrame(data[1:], columns=data[0])
        rba_df.columns = ["date", "change_pct", "cash_rate_pct"]
        rba_df['date'] = pd.to_datetime(rba_df['date'], format='%d %b %Y')
        rba_df['date'] = rba_df['date'].dt.strftime('%Y-%m-%d')
        rba_df = rba_df[rba_df['date'] > '2011-09-30']
        return rba_df

    html_content = fetch_rba_data(RBA_URL)
    
    if html_content:
        data = parse_rba_data(html_content)
        rba_df = create_rba_dataframe(data)
        return rba_df
    else:
        return None

def load_aus_data():
    BASE_URL = 'https://api.data.abs.gov.au/data/'
    DATAFLOW_IDENTIFIER = "ABS,RES_DWELL_ST,1.0.0"
    DATAKEY = ""

    def fetch_abs_data(base_url, dataflow_identifier, datakey):
        format_param = "format=jsondata"
        detail_param = "detail=dataonly"
        url = f"{base_url}{dataflow_identifier}/{datakey}?{detail_param}&{format_param}"

        try:
            response = requests.get(url)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Error fetching ABS data: {e}")
            return None

    def create_aus_dataframe(json_data):
        series = json_data['data']['dataSets'][0]['series']
        series_to_add = {'4:3:0': 'aus_mean_price', '4:5:0': 'nsw_mean_price', '4:7:0': 'vic_mean_price', '4:2:0': 'qld_mean_price',
                         '4:0:0': 'sa_mean_price', '4:6:0': 'wa_mean_price', '4:8:0': 'tas_mean_price',
                         '4:4:0': 'nt_mean_price', '4:1:0': 'act_mean_price'}
        aus_df = pd.DataFrame()
        time_period = pd.date_range(start='2011-07-01', periods=45, freq='Q')
        time_period = time_period.strftime('%Y-%m-%d')
        aus_df['date'] = time_period

        for key, value in series_to_add.items():
            observations = series[key]['observations']
            new_df = pd.DataFrame.from_dict(observations, orient='index')
            new_df.rename(columns={0: value}, inplace=True)
            new_df = new_df.reset_index(drop=True)
            aus_df = pd.concat([aus_df, new_df], axis=1)

        aus_df.fillna(0, inplace=True)
        return aus_df

    json_data = fetch_abs_data(BASE_URL, DATAFLOW_IDENTIFIER, DATAKEY)

    if json_data:
        aus_df = create_aus_dataframe(json_data)
        return aus_df
    else:
        return None

def load_mortgage_data():
    CSV_PATH = '../data/housinglending.csv'

    def read_csv_file(csv_path):
        try:
            data = pd.read_csv(csv_path)
            return data
        except FileNotFoundError as e:
            print(f"Error reading CSV file: {e}")
            return None

    def create_mortgage_dataframe(data):
        mortgage_df = data.iloc[:, :2]
        mortgage_df.columns = ['date', 'mortgage_rate']
        mortgage_df['date'] = pd.to_datetime(mortgage_df['date'], format='%d/%m/%Y').dt.strftime('%Y-%m-%d')
        mortgage_df = mortgage_df.dropna()
        return mortgage_df

    data = read_csv_file(CSV_PATH)

    if data is not None:
        mortgage_df = create_mortgage_dataframe(data)
        return mortgage_df
    else:
        return None
