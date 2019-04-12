### WIKIDATA SCRIPTS
##### https://query.wikidata.org
---
All instaces of `branch of science `: (208 results)
```SELECT ?item ?itemLabel
 WHERE {
   ?item wdt:P31 wd:Q2465832 .
   SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
 }
 ```
---

All instaces of `branch of physics `: (93 results)
```SELECT ?item ?itemLabel
 WHERE {
   ?item wdt:P31 wd:Q4162444 .
   SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
 }
 ```
---

All instances or subclasses of `branch of science `: (1694 results, see /data/raw.csv)
```
SELECT DISTINCT ?item ?itemLabel ?itemDescription ?instanceLabel ?subclassLabel ?image
WHERE {
  ?item wdt:P31/wdt:P279*|wdt:P31/wdt:P31* wd:Q2465832 .
  OPTIONAL{
    ?item wdt:P31 ?instance.
    ?item wdt:P279 ?subclass.
    ?item wdt:P18 ?image .
  }  
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
 ```