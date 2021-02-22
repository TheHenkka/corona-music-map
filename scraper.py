import datetime
import sqlite3
import pathlib
import time
import json
import csv
import sys
import os
import requests

with open('data/spotifyCountries.json', 'r') as f:
    countryArray = json.load(f)

with open('data/nameToCode.json', 'r') as f:
    codeArray = json.load(f)


#Add country to database.
def addCountry(country):

    add = """
    INSERT INTO countries (country_name)
    VALUES (:country_name)
    """

    cur = con.cursor()

    try:
        cur.execute(add, {"country_name": country})
        con.commit()
    except:
        print("Can't add to DB, error: %s" % sys.exc_info())


#Add songs to database.
def addSongs(week, country, position, song, artist, streams, website):

    add = """
    INSERT INTO playlist (week, country, position, song, artist, streams, website)
    VALUES (:week, :country, :position, :song, :artist, :streams, :website)
    """

    cur = con.cursor()

    try:
        cur.execute(add, {"week": week, "country": country, "position": position,
                          "song": song, "artist": artist, "streams": streams, "website": website})
        con.commit()
    except:
        print("Can't add to DB, error: %s" % sys.exc_info())


# Open the database
def openData():
    try:
        con = sqlite3.connect(pathlib.Path('data/spotify.sql'))
        con.row_factory = sqlite3.Row
        con.execute("PRAGMA foreign_keys = ON")
        return con
    except:
        print("Can't open Database")
        for err in sys.exc_info():
            print(err)
        return None

#Get data from URL. Save it.
def getData(countryName, countryCode):

    # Spotify week 1 starts on 2019-12-27
    weekStart = datetime.date(2019, 12, 27)
    weekEnd = weekStart + datetime.timedelta(7)
    i = 1


    # Loop through every week, get URL and save data to database
    while datetime.date.today() > weekStart:   

        start = time.time()

        week = str(weekStart) + '--' + str(weekEnd)
        weekStart = weekStart + datetime.timedelta(7)
        weekEnd = weekStart + datetime.timedelta(7)

        if datetime.date.today() < weekStart:
            week = 'latest'

        url = 'https://spotifycharts.com/regional/' + \
            countryCode + '/weekly/' + week + '/download'

        check = False
        lines = []

        # Try to open the URL. If it doesn't open it means Spotify doesn't have data for this week.
        try:
            data = requests.get(url)
            lines = data.content.decode('utf-8').splitlines()

        except requests.exceptions.RequestException as e:  
            print("WEEK: " + str(i))
            print(e)
            check = True        

        # For some reason Spotify might not have all weeks per country. Change list to Global list if so.
        if check == True or len(lines) != 202:

            print("No data for the week. Using Global list. WEEK: " + str(i))

            url = 'https://spotifycharts.com/regional/global/weekly/' + week + '/download'
            
            try:
                data = requests.get(url)
                lines = data.content.decode('utf-8').splitlines()
            except requests.exceptions.RequestException as e:  
                print("WEEK: " + str(i))
                print(e)
                i += 1
                continue

        # First two lines don't have anything useful
        lines.pop(0)
        lines.pop(0)
        
        #Write only if list is found.
        if len(lines) == 200:

            # CSV reader needs iterable strings
            lineList = []

            #Store top 10 
            for line in lines[0:10]:
                lineList.append(line)

            for line in csv.reader(lineList):
                addSongs(i, countryName, line[0], line[1], line[2], line[3], line[4])

        else:
            print("Can't write to db. Data not found.")

        end = time.time()
        total = end - start

        if total >5:
            print("it takes long..")
        if total >8:
            print("it takes very long..")
        if total >12:
            print("it takes super long..")
        if total >20:
            print("weird..")
        if total >30:
            print("is it working?")
        if total >45:
            print("...?")
        if total >60:
            print("..?")
        if total >90:
            print(".?")
            
        i += 1


start = time.time()
con = openData()


# Find countries that have Spotify and save weekly data from every country
for country in countryArray["countries"]:
    for code in codeArray:

        if country == code["country"]: # and country == "Finland":

            print(country)

            countryCode = code["abbreviation"].lower()
            addCountry(country)
            getData(country, countryCode)

            print("OK")
            print("---")

print("Global")

addCountry("Global")
getData("Global", "global")

print("OK")
print("---")

end = time.time()
total = (end - start)/60

print("It took this long!:")
print(total + " mins")
