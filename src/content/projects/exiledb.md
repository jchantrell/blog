---
name: ExileDB
link: https://github.com/jchantrell/exiledb
tags: Golang, CLI, Decryption, SQL, ETL
---
A Golang CLI application for downloading and extracting Path of Exile 1 & 2's tabular data into a SQLite DB. The raw data from the game's patch servers comes in a [compressed bundle format](https://poedb.tw/us/Bundle_schema) that's encrypted with a MurmurHash64A hash, which once decrypted is roughly equivalent to a hierarchal file system. The tool developer community maintains a [GraphQL schema](https://github.com/poe-tool-dev/dat-schema) that describes what segments of bytes map to specific data types in the data tables contained within these bundles, which the application uses to dynamically create the SQL tables with the correct data types and foreign key relations. It's a tool that you download once and that will work regardless of either game's patch version, as the format is based on the tool dev community schema. It can also export and transform various other files from the bundles as well (e.g. DDS images into PNG, text files, etc.)
