import urllib.request
import urllib.error
import datetime
import sqlite3
import pathlib
import json
import csv
import sys
import os

with open('data/spotifyCountries.json', 'r') as f:
    countryArray = json.load(f)

with open('data/nameToCode.json', 'r') as f:
    codeArray = json.load(f)


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


def addSongs(week, country, position, song, artist, streams, website):

    add = """
    INSERT INTO week (week, country, position, song, artist, streams, website)
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

con = openData()


# Find countries that have Spotify and save weekly data from every country
for country in countryArray["countries"]:
    for code in codeArray:

        if country == code["country"]:

            print(country)

            # addCountry(country)

            # Spotify week 1 starts on 2019-12-27
            weekStart = datetime.date(2019, 12, 27)
            weekEnd = weekStart + datetime.timedelta(7)
            i = 1

            # Loop through every week, get URL and save data to database
            while datetime.date.today() > weekStart:

                name = code["abbreviation"].lower()
                week = str(weekStart) + '--' + str(weekEnd)

                weekStart = weekStart + datetime.timedelta(7)
                weekEnd = weekStart + datetime.timedelta(7)

                if datetime.date.today() < weekStart:
                    week = 'latest'

                url = 'https://spotifycharts.com/regional/' + \
                    name + '/weekly/' + week + '/download'

                req = urllib.request.Request(
                    url, headers={'User-Agent': 'Mozilla /5.0'})

                check = False

                # Try open the URL. If it doesn't open it means Spotify doesn't have data for this week.
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
                if lines[0].decode() == "<!doctype html>" or check == True:

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

                #CSV reader needs iterable strings
                lineList =[]
                for line in lines:
                    lineList.append(line.decode())

                # First two lines don't have anything useful
                lineList.pop(0)
                lineList.pop(0)

                for line in csv.reader(lineList):
                    addSongs(i, country, line[0], line[1], line[2], line[3], line[4])

                i += 1

            print("OK")
            print("---")