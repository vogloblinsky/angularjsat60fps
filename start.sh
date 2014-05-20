#! /bin/sh

killall python
cd 1-presentation && python -m SimpleHTTPServer 8000 &
cd 2-demonstrations && python -m SimpleHTTPServer 8001 &
