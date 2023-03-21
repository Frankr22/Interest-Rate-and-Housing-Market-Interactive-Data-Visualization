# dependencies
import streamlit as st
from sqlalchemy import create_engine
from sqlalchemy import inspect
from data_loaders import load_rba_data, load_aus_data, load_mortgage_data

# Create the connection to the SQLite database
def create_db_connection():
    protocol = 'sqlite'
    database_name = 'rates_db.sqlite'
    connection_string = f'{protocol}:///{database_name}'
    engine = create_engine(connection_string)
    insp = inspect(engine)
    return engine

def store_data_to_db(engine, rba_df, aus_df, mortgage_df):
    rba_df.to_sql(name='interest_rates', con=engine, if_exists='replace', index=False)
    aus_df.to_sql(name='aus_dwelling_mean', con=engine, if_exists='replace', index=False)
    mortgage_df.to_sql(name='housing_lending', con=engine, if_exists='replace', index=False)

# Streamlit app
def main():
    # Set up the sidebar
    st.sidebar.title("Data Sources")
    show_rba_data = st.sidebar.checkbox("Show RBA Interest Rates Data", value=True)
    show_abs_data = st.sidebar.checkbox("Show ABS Dwelling Mean Data", value=True)
    show_mortgage_data = st.sidebar.checkbox("Show Mortgage Rates Data", value=True)

    # Load the data and store it to the database
    rba_df = load_rba_data()
    aus_df = load_aus_data()
    mortgage_df = load_mortgage_data()
    engine = create_db_connection()
    store_data_to_db(engine, rba_df, aus_df, mortgage_df)

    # Display the data
    st.title("Interest Rates, Dwelling Mean and Mortgage Rates Data")

    if show_rba_data:
        st.subheader("RBA Interest Rates Data")
        st.write(rba_df)

    if show_abs_data:
        st.subheader("ABS Dwelling Mean Data")
        st.write(aus_df)

    if show_mortgage_data:
        st.subheader("Mortgage Rates Data")
        st.write(mortgage_df)

if __name__ == "__main__":
    main()
