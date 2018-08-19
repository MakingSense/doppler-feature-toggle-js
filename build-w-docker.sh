#!/bin/sh

echo BRANCH_NAME $1
echo CHANGE_ID $2
echo BUILD_TAG $3
echo GIT_BRANCH $4
echo GIT_COMMIT $5

# Exit immediately if a command exits with a non-zero status.
set -e

# Lines added to get the script running in the script path shell context
# reference: http://www.ostricher.com/2014/10/the-right-way-to-get-the-directory-of-a-bash-script/
cd $(dirname $0)

docker run --rm \
    -v /`pwd`:/work \
    -w /work \
    node:6-alpine \
    /bin/sh -c "\
        yarn \
        && yarn run test:prod \
        && yarn run build \
    "
