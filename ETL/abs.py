import requests

dataflowIdentifier = "RES_DWELL"
dataKey = "all"
startPeriod = ""
endPeriod = ""
detail = "Full"
dimensionAtObservation = "AllDimensions"

## url = f"https://www.abs.gov.au/data/{dataflowIdentifier}/{dataKey}?startPeriod={startPeriod}&endPeriod={endPeriod}&detail={detail}&dimensionAtObservation={dimensionAtObservation}"
url = 'https://api.data.abs.gov.au/data/jv/all?startPeriod=2020&format=jsondata'
response = requests.get(url)
print(response)

if response.status_code == 200:
    # Successful API call
    data = response.json()
    # Do something with the data
else:
    # Handle unsuccessful API call
    print("Error: Failed to fetch data from ABS website.")