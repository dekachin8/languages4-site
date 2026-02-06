# Pre-launch check script for Languages 4 website

Write-Host "🚀 Starting Pre-Launch Checks..." -ForegroundColor Cyan
Write-Host ""

# 1. Build Check
Write-Host "📦 Building site..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Build successful" -ForegroundColor Green
Write-Host ""

# 2. TypeScript Check
Write-Host "🔍 Checking TypeScript..." -ForegroundColor Yellow
npx tsc --noEmit
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ No TypeScript errors" -ForegroundColor Green
} else {
    Write-Host "⚠️  TypeScript warnings found" -ForegroundColor Yellow
}
Write-Host ""

# 3. Check for TODO/FIXME comments
Write-Host "📝 Checking for TODO/FIXME comments..." -ForegroundColor Yellow
$todos = Get-ChildItem -Path src -Recurse -Include *.astro,*.ts,*.js | Select-String "TODO|FIXME"
if ($todos) {
    Write-Host "⚠️  Found TODOs/FIXMEs:" -ForegroundColor Yellow
    $todos
} else {
    Write-Host "✅ No TODOs found" -ForegroundColor Green
}
Write-Host ""

# 4. Check for console.logs
Write-Host "🔍 Checking for console.log statements..." -ForegroundColor Yellow
$logs = Get-ChildItem -Path src -Recurse -Include *.astro,*.ts,*.js | Select-String "console\.log"
if ($logs) {
    Write-Host "⚠️  Found console.logs:" -ForegroundColor Yellow
    $logs
} else {
    Write-Host "✅ No console.logs found" -ForegroundColor Green
}
Write-Host ""

Write-Host "✅ Pre-launch checks complete!" -ForegroundColor Green