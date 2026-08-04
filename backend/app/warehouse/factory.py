from .postgres import PostgresAdapter

def get_warehouse_adapter(warehouse_type: str = "postgres"):
    if warehouse_type == "postgres":
        return PostgresAdapter()
    elif warehouse_type in ["snowflake", "databricks", "bigquery"]:
        raise NotImplementedError(f"{warehouse_type.capitalize()} adapter is configured but pending implementation in a future phase.")
    else:
        raise ValueError("Unsupported warehouse type")
