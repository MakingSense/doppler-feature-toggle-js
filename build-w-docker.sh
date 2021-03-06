#!/bin/sh

# Exit immediately if a command exits with a non-zero status.
set -e

# Lines added to get the script running in the script path shell context
# reference: http://www.ostricher.com/2014/10/the-right-way-to-get-the-directory-of-a-bash-script/
cd $(dirname $0)

docker run --rm \
    -v /`pwd`:/work \
    -w /work \
    node:8 \
    /bin/sh -c "\
        yarn \
        && yarn run test:prod \
        && yarn run build \
    "
