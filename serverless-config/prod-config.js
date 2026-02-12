module.exports.s3policy = {
    "Sid": "Allow Access from Zscaler IP address",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws-us-gov:s3:::eitc-frontend-bucket-prod/*",
    "Condition": {
        "IpAddress": {
            "aws:SourceIp": [
                "104.96.220.0/24",
                "168.143.242.0/24",
                "168.143.243.0/24",
                "184.25.254.0/24",
                "184.28.190.0/24",
                "184.51.101.0/24",
                "23.205.108.0/24",
                "23.213.54.0/24",
                "23.213.55.0/24",
                "23.215.130.0/24",
                "23.215.131.0/24",
                "23.47.59.0/24",
                "23.59.176.0/24",
                "96.6.127.0/24",
                "96.7.218.0/24"

            ]
        }
    }
}