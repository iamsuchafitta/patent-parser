# Enter backup file name (File must be near this script in the same directory)
echo "Enter backup file name (*.dump must be at \"dev-utils/backups/\")"
read BACKUP_NAME
BACKUP_NAME=$(echo "$BACKUP_NAME" | tr -d '[:cntrl:]')
BACKUP_PATH="/opt/backups/$BACKUP_NAME"

# Check if file exists
if [ ! -f "$BACKUP_PATH" ]; then
    echo "File \"$BACKUP_PATH\" does not exist"
    exit 1
fi

# Hint: Variables are provided from the docker compose file, because it's being run will inside DB container
export PGUSER=$POSTGRES_USER
export PGPASSWORD=$POSTGRES_PASSWORD

# Drop public schema to avoid conflicts
psql -d $POSTGRES_DB -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"

# Restore backup
echo "Restoring backup..."
pg_restore --no-owner -d $POSTGRES_DB $BACKUP_PATH
echo "Script ended"
