#!/bin/sh

buildNumber=${1:-"SN"}
pkgName="doppler-feature-toggle"
cdnBaseUrl=${2:-"//cdn.fromdoppler.com/$pkgName"}

# Exit immediately if a command exits with a non-zero status.
set -e

# Lines added to get the script running in the script path shell context
# reference: http://www.ostricher.com/2014/10/the-right-way-to-get-the-directory-of-a-bash-script/
cd $(dirname $0)

./build-w-docker.sh

docker run --rm \
    -e GH_TOKEN \
    -e NPM_TOKEN \
    -v /`pwd`:/work \
    -w /work \
    node:8 \
    /bin/sh -c "\
        yarn run semantic-release \
    "

# TODO: determine pkgVersion based on semantic-release output
# TODO: upload bundle to our CDN

# # Force pull the latest image version due to the cache not always is pruned immediately after an update is uploaded to docker hub
# docker pull dopplerrelay/doppler-relay-akamai-publish

# docker run --rm \
#     -e AKAMAI_CDN_HOSTNAME \
#     -e AKAMAI_CDN_USERNAME \
#     -e AKAMAI_CDN_PASSWORD \
#     -e AKAMAI_CDN_CPCODE \
#     -e "PROJECT_NAME=$pkgName" \
#     -e "VERSION_NAME=$pkgVersion" \
#     -v /`pwd`/dist:/source \
#     dopplerrelay/doppler-relay-akamai-publish
