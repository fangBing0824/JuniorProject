# Change to the script's directory
Set-Location $PSScriptRoot

Write-Host "`nCleaning up old class files..."
Remove-Item -Filter "*.class" -ErrorAction SilentlyContinue

Write-Host "`nCompiling Java files..."
javac -Xlint:unchecked -cp "sqlite-jdbc-3.49.1.0.jar;" Main.java

# Check if compilation was successful
if ($LASTEXITCODE -ne 0) {
    Write-Host "`nCompilation failed!" -ForegroundColor Red
    exit 1
}

Write-Host "`nIPV4 address:"
# Get IPv4 address (excluding localhost)
Get-NetIPAddress | 
    Where-Object { $_.AddressFamily -eq 'IPv4' -and $_.IPAddress -ne '127.0.0.1' } | 
    Select-Object -ExpandProperty IPAddress -First 1

Write-Host "`nStarting server..."
java -cp "sqlite-jdbc-3.49.1.0.jar;" Main