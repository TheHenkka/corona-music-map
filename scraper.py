import urllib.request
import urllib.error
import datetime
import sqlite3
import pathlib
import time
import json
import csv
import sys
import os

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
        con = sqlite3.connect(pathlib.Path('data/spotify1.sql'))
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

        week = str(weekStart) + '--' + str(weekEnd)
        weekStart = weekStart + datetime.timedelta(7)
        weekEnd = weekStart + datetime.timedelta(7)

        if datetime.date.today() < weekStart:
            week = 'latest'

        url = 'https://spotifycharts.com/regional/' + \
            countryCode + '/weekly/' + week + '/download'

        req = urllib.request.Request(
            url, headers={'User-Agent': 'Mozilla /5.0'})

        check = False
        lines = []

        # Try to open the URL. If it doesn't open it means Spotify doesn't have data for this week.
        try:
            data = urllib.request.urlopen(req).read()
            lines = data.splitlines()
        except urllib.error.HTTPError as e:
            print("WEEK: " + str(i))
            print(e.code)
            check = True
        except urllib.error.URLError as e:
            print("WEEK: " + str(i))
            print(e.args)
            check = True

        # For some reason Spotify might not have all weeks per country. Change list to Global list if so.
        if check == True or len(lines) != 202:

            print("No data for the week. Using Global list. WEEK: " + str(i))

            url = 'https://spotifycharts.com/regional/global/weekly/' + week + '/download'
            req = urllib.request.Request(
                url, headers={'User-Agent': 'Mozilla /5.0'})
            try:
                data = urllib.request.urlopen(req).read()
                lines = data.splitlines()
            except urllib.error.HTTPError as e:
                print("WEEK: " + str(i))
                print(e.code)
                i += 1
                continue
            except urllib.error.URLError as e:
                print("WEEK: " + str(i))
                print(e.args)
                i += 1
                continue
        
        # First two lines don't have anything useful
        lines.pop(0)
        lines.pop(0)
        
        #Write only if list is found.
        if len(lines) == 200:

            # CSV reader needs iterable strings
            lineList = []

            for line in lines:
                lineList.append(line.decode())

            for line in csv.reader(lineList):
                addSongs(i, countryName, line[0], line[1], line[2], line[3], line[4])

        else:
            print("Can't write to db. Data not found.")

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

print("It took this long!:")
print(str(datetime.timedelta(end - start)))
