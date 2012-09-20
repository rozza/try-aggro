#!/bin/bash
mongo --eval "use agg; db.dropDatabase();"
for i in *.json; do echo $i; mongo agg $i; done
