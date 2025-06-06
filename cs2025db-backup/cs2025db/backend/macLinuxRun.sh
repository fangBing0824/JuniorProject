# I up dated the sqlite-jdbc from 3.23.1 to 3.49.1 be cause of lack of support for ARM Mac/Windows!!!!
# The SQLite JDBC library has versions that support ARM architecture. 
# For example, sqlite-jdbc version 3.32.3.2 includes fixes for ARM Cortex A8 and A9 (32-bit architecture)
# - Muheng Fan

#!/bin/bash
cd "$(dirname "$0")"

# Clean up old class files
echo "

Cleaning up old class files..."
rm -f *.class

# Compile with proper flags
echo "

Compiling Java files..."
javac -Xlint:unchecked -cp sqlite-jdbc-3.49.1.0.jar: Main.java

# Check if compilation was successful
if [ $? -ne 0 ]; then
    echo "
    
    Compilation failed!"
    exit 1
fi

echo "

IPV4 address:"
# Detect OS and print IP address accordingly
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -n 1)
else
    # Linux
    IP=$(ip -4 addr show | grep -oP '(?<=inet )[^/]+' | grep -v 127.0.0.1 | head -n 1)
fi

if [ -z "$IP" ]; then
    echo "Warning: Could not determine IP address"
else
    echo "$IP"
fi

echo "

Starting server..."
java -cp sqlite-jdbc-3.49.1.0.jar: Main