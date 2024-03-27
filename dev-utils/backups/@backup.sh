# Enter backup file name (File must be near this script in the same directory)
echo "Enter backup name without path or ext, it will be created at \"dev-utils/backups/<name>.dump\""
read BACKUP_NAME
BACKUP_NAME=$(echo "$BACKUP_NAME" | tr -d '[:cntrl:]')

# Hint: Variables are provided from the docker compose file, because it's being run will inside DB container
export PGUSER=$POSTGRES_USER
export PGPASSWORD=$POSTGRES_PASSWORD
export PGDATABASE=$POSTGRES_DB

# Create backup
pg_dump --no-owner -F c -b -v -f $(dirname "$0")/$BACKUP_NAME-$(date +"%Y-%m-%dT%H-%M-%SZ").dump
