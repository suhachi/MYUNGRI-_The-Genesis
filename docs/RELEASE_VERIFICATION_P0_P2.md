# P0/P2 Release Verification Checklist
**Target**: Production Release Candidate
**Date**: 2026-01-05

## 1. System Integrity (P0)

### 1.1 Service Worker & Build Stamps
- [ ] **Build Stamp Verification**
  - Navigate to `/report/:id` (or any existing report).
  - Scroll to Footer.
  - **Confirm**: `BUILD: <commit> <ISO>` is visible.
  - **Confirm**: `VER: <version>` is matching `package.json`.
  - **Capture**: Screenshot of Footer.

### 1.2 Hosting Headers
- [ ] **Cache Policy Verification**
  - Open DevTools -> Network Tab.
  - Reload page (ignoring cache if needed, but check header response).
  - Click `index.html` (or `/`).
  - **Confirm Header**: `Cache-Control: no-cache, no-store, must-revalidate`.
  - **Confirm Header**: `Pragma: no-cache`.
  - **Confirm Header**: `Expires: 0`.
  - **Capture**: Screenshot of Headers.

### 1.3 Service Worker Status
- [ ] **SW Lifecycle**
  - Locate `SW: Active (..., ...)` in Footer.
  - **Confirm**: Status includes Scope (e.g., `root` or `myungri-the-genesis`) and Controller (`Ctrl` or `No-Ctrl`).
  - **Action**: Check Application Tab -> Service Workers.
  - **Confirm**: Status matches UI.
  - **Capture**: Screenshot of Application Tab.

## 2. Input Validation & IME (ATOMIC-02)

### 2.1 Hangul Logic
- [ ] **Syllable Preservation**
  - Go to `/start`.
  - Type `배` using Korean IME (Key sequence: `q` + `o`).
  - **Confirm**: Character `배` remains intact (no deletion).
  - Type `배종수`.
  - **Confirm**: Full name `배종수` is entered correctly without cursor jumps.

### 2.2 Hanja Logic
- [ ] **Han Conversion**
  - Type `배` -> Press `Hanja` key -> Select `裵`.
  - **Confirm**: `裵` replaces `배` correctly.
  - Submit form.
  - **Confirm**: Report generation accepts `裵`.

### 2.3 Mixed Input
- [ ] **Alpha/Space**
  - Type `배 Jong Su`.
  - **Confirm**: Mixed input is accepted.

## 3. Backend Logic (ATOMIC-03)

### 3.1 Length Gating
- [ ] **Single Character Check**
  - Input Name: `김` (1 char).
  - Submit.
  - **Confirm**: No error alert, system proceeds to analysis.
- [ ] **Long Name Check**
  - Input Name: `김수한무거북이와두루미삼천갑자동방삭` (Very long).
  - Submit.
  - **Confirm**: No error alert, system proceeds.
