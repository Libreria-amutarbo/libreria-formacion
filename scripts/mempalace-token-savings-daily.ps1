param(
    [Parameter(Mandatory = $true)]
    [string]$Query,

    [Parameter(Mandatory = $true)]
    [int]$BaselineTokens,

    [int]$SessionsPerWeek = 20,
    [int]$SearchesPerSession = 2,
    [int]$CharsPerToken = 4
)

$ErrorActionPreference = 'Stop'

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$repoRoot = Resolve-Path (Join-Path $scriptDir '..')
$metricsDir = Join-Path $repoRoot 'metrics\mempalace'

if (-not (Test-Path $metricsDir)) {
    New-Item -ItemType Directory -Path $metricsDir -Force | Out-Null
}

$dateStamp = Get-Date -Format 'yyyy-MM-dd'
$timeStamp = Get-Date -Format 'HHmmss'
$safeQuery = ($Query.ToLower() -replace '[^a-z0-9_-]+', '-') -replace '^-+', '' -replace '-+$', ''
if ([string]::IsNullOrWhiteSpace($safeQuery)) {
    $safeQuery = 'query'
}

$jsonPath = Join-Path $metricsDir ("token-savings-{0}-{1}-{2}.json" -f $dateStamp, $timeStamp, $safeQuery)
$csvPath = Join-Path $metricsDir 'token-savings-history.csv'
$baseScript = Join-Path $scriptDir 'mempalace-token-savings.ps1'

$jsonReport = & $baseScript `
    -Query $Query `
    -BaselineTokens $BaselineTokens `
    -SessionsPerWeek $SessionsPerWeek `
    -SearchesPerSession $SearchesPerSession `
    -CharsPerToken $CharsPerToken `
    -Json `
    -OutFile $jsonPath

$result = $jsonReport | ConvertFrom-Json

$csvRow = [pscustomobject]@{
    created_at = $result.created_at
    query = $result.query
    baseline_tokens_per_session = $result.baseline_tokens_per_session
    wake_tokens_approx = $result.wake_tokens_approx
    search_tokens_approx = $result.search_tokens_approx
    searches_per_session = $result.searches_per_session
    with_mempalace_tokens_per_session = $result.with_mempalace_tokens_per_session
    saved_tokens_per_session = $result.saved_tokens_per_session
    savings_percent_per_session = $result.savings_percent_per_session
    sessions_per_week = $result.sessions_per_week
    weekly_baseline_tokens = $result.weekly_baseline_tokens
    weekly_with_mempalace_tokens = $result.weekly_with_mempalace_tokens
    weekly_saved_tokens = $result.weekly_saved_tokens
    json_report = $jsonPath
}

if (Test-Path $csvPath) {
    $csvRow | Export-Csv -Path $csvPath -NoTypeInformation -Append
} else {
    $csvRow | Export-Csv -Path $csvPath -NoTypeInformation
}

Write-Output 'MemPalace daily metrics saved'
Write-Output ('JSON: ' + $jsonPath)
Write-Output ('CSV:  ' + $csvPath)
Write-Output ('Saved/session: ' + $result.saved_tokens_per_session + ' tokens (' + $result.savings_percent_per_session + '%)')
