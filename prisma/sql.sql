-- patents_count_changed

CREATE OR REPLACE FUNCTION patents_count_changed() RETURNS TRIGGER AS
$BODY$
BEGIN
    PERFORM pg_notify('patents_count_changed', (SELECT COUNT(*) FROM "Patent")::text);
    RETURN NULL;
END;
$BODY$
    LANGUAGE plpgsql;

CREATE or replace TRIGGER patents_count_changed
    AFTER INSERT OR DELETE
    ON "Patent"
    FOR EACH ROW
EXECUTE PROCEDURE patents_count_changed();

-- monitor_log_inserted

CREATE OR REPLACE FUNCTION monitor_log_inserted() RETURNS TRIGGER AS
$BODY$
BEGIN
    PERFORM pg_notify('monitor_log_inserted', NEW.id);
    RETURN NULL;
END;
$BODY$
    LANGUAGE plpgsql;

CREATE or replace TRIGGER monitor_log_inserted
    AFTER INSERT
    ON "MonitorLog"
    FOR EACH ROW
EXECUTE PROCEDURE monitor_log_inserted();

-- monitor_stat_inserted

CREATE OR REPLACE FUNCTION monitor_stat_inserted() RETURNS TRIGGER AS
$BODY$
BEGIN
    PERFORM pg_notify('monitor_stat_inserted', NEW.id);
    RETURN NULL;
END;
$BODY$
    LANGUAGE plpgsql;

CREATE or replace TRIGGER monitor_stat_inserted
    AFTER INSERT
    ON "MonitorStat"
    FOR EACH ROW
EXECUTE PROCEDURE monitor_stat_inserted();

-- queue_length_changed

CREATE OR REPLACE FUNCTION queue_length_changed() RETURNS TRIGGER AS
$BODY$
BEGIN
    PERFORM pg_notify('queue_length_changed', (SELECT COUNT(*) FROM "PatentParseQueue")::text);
    RETURN NULL;
END;
$BODY$
    LANGUAGE plpgsql;

CREATE or replace TRIGGER queue_length_changed
    AFTER DELETE OR UPDATE
    ON "PatentParseQueue"
    FOR EACH ROW
EXECUTE PROCEDURE queue_length_changed();
