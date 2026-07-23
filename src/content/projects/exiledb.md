---
name: ExileDB
link: https://github.com/jchantrell/exiledb
tags: Golang, CLI, SQL
---
A Golang CLI application for extracting Path of Exile 1 & 2's data into useful formats. The game's data comes in a [compressed bundle format](https://poedb.tw/us/Bundle_schema), which once decompressed is roughly equivalent to a hierarchical file system. The tool developer community maintains a [GraphQL schema](https://github.com/poe-tool-dev/dat-schema) that describes a sequential byte-to-datatype mapping of the game's tabular data files, which this tool uses to dynamically turn it into a queryable format via SQLite. Beyond the core use case, the tool can also extract and convert various other file types (DDS images into PNG, audio files, etc.). Additionally, the repository has a GitHub release workflow that shows deltas between patches using the CLI's outputs.
