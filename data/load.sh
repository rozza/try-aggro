#!/bin/bash
mongo agg --eval "db.dropDatabase();"
for i in *.json; do echo $i; mongo agg $i; done
