# [Zero Tolerance] Production Rollback Script (PowerShell)
# Usage: ./scripts/rollback.ps1 [<version_id>]

$VersionId = $args[0]

Write-Host "🚨 [Rollback] Initiating emergency production rollback..." -ForegroundColor Red

# 1. Hosting Rollback
if ($VersionId) {
    Write-Host "📦 Rolling back Hosting to version: $VersionId" -ForegroundColor Yellow
    firebase hosting:clone "myungri-genesis:$VersionId" myungri-genesis:live
} else {
    Write-Host "📦 Rolling back Hosting to PREVIOUS version..." -ForegroundColor Yellow
    firebase hosting:rollback
}

# 2. Functions Rollback (Manual Intervention Note)
# Firebase Functions는 배포 시점에 코드 전체가 스냅샷되므로, 
# 이전 버전의 코드로 다시 배포(deploy)하는 것이 공식 롤백 방식입니다.
Write-Host "`n⚠️ [Note] Firebase Functions are stateless snapshoted at deploy time." -ForegroundColor Cyan
Write-Host "👉 To fully rollback Functions, checkout the previous stable Git tag and run:" -ForegroundColor Cyan
Write-Host "   firebase deploy --only functions" -ForegroundColor Green

Write-Host "`n✅ Rollback command sequence initiated." -ForegroundColor Green
Write-Host "👉 PLEASE: Run 'firebase hosting:channel:list' to verify the live version." -ForegroundColor White
