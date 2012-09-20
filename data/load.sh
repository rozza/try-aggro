#!/bin/bash
mongo agg --eval "db.dropDatabase();"
for i in *.js; do echo $i; mongo agg $i; done
