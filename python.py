from geopy.geocoders import ArcGIS
nom = ArcGIS()
loc = nom.geocode('Block III Hostel, 4th Cross Road, Anna University, Kotturpuram, Chennai, Tamil Nadu 600025')
print(loc[1])
lat = loc[1][0]
lon = loc[1][0]