import urllib.request
import urllib.error
import datetime
import pathlib
import json
import csv
import os

with open('data/spotifyCountries.json', 'r') as f:
    countryArray = json.load(f)

with open('data/nameToCode.json', 'r') as f:
    codeArray = json.load(f)

# Scrapes spotifycharts.com for TOP lists. Finds countries that have Spotify and saves weekly data from every country
for country in countryArray["countries"]:
    for code in codeArray:

        if country == code["country"]:

            print(country)

            # Spotify week 1 starts on 2019-12-27. Needed for URL
            weekStart = datetime.date(2019, 12, 27)
            weekEnd = weekStart + datetime.timedelta(7)
            i = 0

            # Loop through every week, create URL and save data to file
            while datetime.date.today() > weekStart:

                name = code["abbreviation"].lower()
                week = str(weekStart) + '--' + str(weekEnd)

                weekStart = weekStart + datetime.timedelta(7)
                weekEnd = weekStart + datetime.timedelta(7)

                # If file exists, check the next one.
                if pathlib.Path('data/SpotifyData/'+name+'_week_'+str(i)+'.csv').is_file():
                    i += 1
                    continue

                if datetime.date.today() < weekStart:
                    week = 'latest'

                url = 'https://spotifycharts.com/regional/' + \
                    name + '/weekly/' + week + '/download'

                req = urllib.request.Request(
                    url, headers={'User-Agent': 'Mozilla /5.0'})

                # Try open the URL. If it doesn't open it means Spotify doesn't have data for this week. Country might just been added. Or no internet 
                try:
                    data = urllib.request.urlopen(req).read()
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

                lines = data.splitlines()

                #Write weekly TOP list to file
                with open(pathlib.Path('data/SpotifyData/'+name+'_week_'+str(i)+'.csv'), 'w', encoding='utf-8') as f:
                    writer = csv.writer(f)
                    for line in lines:
                        writer.writerow(line.decode().split(','))

                i += 1

            print("OK")
            print("---")
