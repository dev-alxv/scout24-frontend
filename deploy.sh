#!/bin/sh
for ARGUMENT in "$@"
do

    KEY=$(echo $ARGUMENT | cut -f1 -d=)
    VALUE=$(echo $ARGUMENT | cut -f2 -d=)

    case "$KEY" in
            ACCESS_KEY)              ACCESS_KEY=${VALUE} ;;
            ACCESS_SECRET)           ACCESS_SECRET=${VALUE} ;;
            BUCKET)                  BUCKET=${VALUE} ;;
            HOOK)                    HOOK=${VALUE} ;;
            *)
    esac


done

export AWS_ACCESS_KEY_ID=$ACCESS_KEY
export AWS_SECRET_ACCESS_KEY=$ACCESS_SECRET
aws s3 cp ./frontend_IS24.tgz s3://$BUCKET/frontend_IS24.tgz
if [ ! -z "$HOOK" ];
then
  curl -v --data "token=HA.bw69aR-4BcfQ8:Z&hook=$HOOK&arguments=" https://release.immoviewer.com
fi
