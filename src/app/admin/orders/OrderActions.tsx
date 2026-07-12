'use client'

import { useState } from 'react'
import { Download, RefreshCw, CheckCircle2 } from 'lucide-react'
import { bulkSyncToSheets, exportToCSV } from '@/app/actions/bulk-sync'

export default function OrderActions({ searchParams }: { searchParams: any }) {
  const [isSyncing, setIsSyncing] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [syncDone, setSyncDone] = useState(false)

  const handleBulkSync = async () => {
    setIsSyncing(true)
    const result = await bulkSyncToSheets(searchParams)
    setIsSyncing(false)
    if (result.success) {
      setSyncDone(true)
      setTimeout(() => setSyncDone(false), 3000)
    } else {
      alert("Failed to sync to Google Sheets. Check webhook settings.")
    }
  }

  const handleExport = async () => {
    setIsExporting(true)
    const result = await exportToCSV(searchParams)
    setIsExporting(false)
    if (result.success && result.csv) {
      const blob = new Blob([result.csv], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `orders_export_${new Date().getTime()}.csv`
      a.click()
    }
  }

  return (
    <div className="flex items-center gap-3">
      <button 
        onClick={handleBulkSync}
        disabled={isSyncing}
        className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-xl transition-colors flex items-center gap-2 disabled:opacity-50"
      >
        {isSyncing ? <RefreshCw className="w-4 h-4 animate-spin" /> : (syncDone ? <CheckCircle2 className="w-4 h-4" /> : <RefreshCw className="w-4 h-4" />)}
        {syncDone ? "Synced!" : "Sync to Sheets"}
      </button>

      <button 
        onClick={handleExport}
        disabled={isExporting}
        className="bg-void border border-border hover:border-gold text-light font-bold py-2 px-4 rounded-xl transition-colors flex items-center gap-2 disabled:opacity-50"
      >
        <Download className="w-4 h-4" /> {isExporting ? "Exporting..." : "Export CSV"}
      </button>
    </div>
  )
}
