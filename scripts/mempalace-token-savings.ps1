param(
    [Parameter(Mandatory = $true)]
    [string]$Query,

    [Parameter(Mandatory = $true)]
    [int]$BaselineTokens,

    [int]$SessionsPerWeek = 20,
    [int]$SearchesPerSession = 2,
    [int]$CharsPerToken = 4,
    [switch]$Json,
    [string]$OutFile
)

$ErrorActionPreference = 'Stop'

function Get-ApproxTokensFromText {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Text,
        [int]$CharsPerToken = 4
    )

    if ($CharsPerToken -le 0) {
        throw 'CharsPerToken must be greater than 0.'
    }

    return [int][Math]::Round($Text.Length / [double]$CharsPerToken, 0)
}

if ($BaselineTokens -le 0) {
    throw 'BaselineTokens must be greater than 0.'
}

if ($SessionsPerWeek -le 0) {
    throw 'SessionsPerWeek must be greater than 0.'
}

if ($SearchesPerSession -le 0) {
    throw 'SearchesPerSession must be greater than 0.'
}

$env:PYTHONUTF8 = '1'
chcp 65001 > $null

$wakeText = mempalace wake-up | Out-String
$searchText = mempalace search $Query | Out-String

$wakeTokens = Get-ApproxTokensFromText -Text $wakeText -CharsPerToken $CharsPerToken
$searchTokens = Get-ApproxTokensFromText -Text $searchText -CharsPerToken $CharsPerToken

$withMemTokensPerSession = $wakeTokens + ($searchTokens * $SearchesPerSession)
$savingsTokensPerSession = $BaselineTokens - $withMemTokensPerSession
$savingsPercent = [double]($savingsTokensPerSession * 100.0 / $BaselineTokens)

$weeklyBaseline = $BaselineTokens * $SessionsPerWeek
$weeklyWithMem = $withMemTokensPerSession * $SessionsPerWeek
$weeklySaved = $weeklyBaseline - $weeklyWithMem

$result = [pscustomobject]@{
    created_at = (Get-Date).ToString('s')
    query = $Query
    baseline_tokens_per_session = $BaselineTokens
    wake_tokens_approx = $wakeTokens
    search_tokens_approx = $searchTokens
    searches_per_session = $SearchesPerSession
    with_mempalace_tokens_per_session = $withMemTokensPerSession
    saved_tokens_per_session = $savingsTokensPerSession
    savings_percent_per_session = [math]::Round($savingsPercent, 2)
    sessions_per_week = $SessionsPerWeek
    weekly_baseline_tokens = $weeklyBaseline
    weekly_with_mempalace_tokens = $weeklyWithMem
    weekly_saved_tokens = $weeklySaved
}

if ($OutFile) {
    $outDir = Split-Path -Parent $OutFile
    if ($outDir -and -not (Test-Path $outDir)) {
        New-Item -ItemType Directory -Path $outDir -Force | Out-Null
    }
    $result | ConvertTo-Json -Depth 4 | Set-Content -Path $OutFile -Encoding UTF8
}

if ($Json) {
    $result | ConvertTo-Json -Depth 4
    exit 0
}

Write-Output 'MemPalace token savings report (approx)'
Write-Output '--------------------------------------'
Write-Output ("Query: " + $result.query)
Write-Output ("Baseline/session: " + $result.baseline_tokens_per_session + " tokens")
Write-Output ("Wake-up: " + $result.wake_tokens_approx + " tokens")
Write-Output ("Search: " + $result.search_tokens_approx + " tokens")
Write-Output ("Searches/session: " + $result.searches_per_session)
Write-Output ("With MemPalace/session: " + $result.with_mempalace_tokens_per_session + " tokens")
Write-Output ("Saved/session: " + $result.saved_tokens_per_session + " tokens")
Write-Output ("Saved/session (%): " + $result.savings_percent_per_session + "%")
Write-Output ("Weekly baseline: " + $result.weekly_baseline_tokens + " tokens")
Write-Output ("Weekly with MemPalace: " + $result.weekly_with_mempalace_tokens + " tokens")
Write-Output ("Weekly saved: " + $result.weekly_saved_tokens + " tokens")

if ($OutFile) {
    Write-Output ("Saved JSON report: " + $OutFile)
}

if ($result.saved_tokens_per_session -lt 0) {
    Write-Warning 'Negative savings detected. Your baseline may be too low or searches/session too high.'
}
