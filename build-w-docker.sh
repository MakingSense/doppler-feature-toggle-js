#!/bin/sh

echo BRANCH_NAME $BRANCH_NAME 
echo CHANGE_ID $CHANGE_ID 
echo BUILD_TAG $BUILD_TAG 
echo GIT_BRANCH $GIT_BRANCH 
echo GIT_COMMIT $GIT_COMMIT

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
