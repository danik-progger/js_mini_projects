# MCP to get weather

To make mcp working in cursor:

1. Run from this project root

    ```sh
    npm install
    npm run build
    ```

2. Add to your mcp configuration

    ```json
    "weather": {
        "enabled": true,
        "command": "node",
        "args": [
            "/ABSOLUTE/PATH/TO/FOLDER/mcp/build/index.js"
        ]
    }
    ```
