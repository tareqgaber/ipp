import { X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { FilterDef, FilterState } from './types'

interface DataTableActiveFiltersProps {
  filters: FilterState
  filterDefs: FilterDef[]
  onRemoveFilter: (key: string) => void
  onClearAll: () => void
}

export function DataTableActiveFilters({
  filters,
  filterDefs,
  onRemoveFilter,
  onClearAll
}: DataTableActiveFiltersProps) {
  const activeFilters = Object.entries(filters).filter(([_, value]) => {
    if (value === null || value === undefined || value === '') return false
    if (Array.isArray(value) && value.length === 0) return false
    return true
  })
  
  if (activeFilters.length === 0) {
    return null
  }
  
  const formatFilterValue = (key: string, value: any): string => {
    const filterDef = filterDefs.find(f => f.key === key)
    
    if (Array.isArray(value)) {
      if (filterDef?.type === 'multi-select') {
        const labels = value.map(v => {
          const option = filterDef.options?.find(opt => opt.value === v)
          return option?.label || v
        })
        return labels.join(', ')
      }
      return value.join(', ')
    }
    
    if (filterDef?.type === 'select') {
      const option = filterDef.options?.find(opt => opt.value === value)
      return option?.label || String(value)
    }
    
    if (value instanceof Date) {
      return value.toLocaleDateString()
    }
    
    return String(value)
  }
  
  const getFilterLabel = (key: string): string => {
    const filterDef = filterDefs.find(f => f.key === key)
    return filterDef?.label || key
  }
  
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm text-muted-foreground">Active filters:</span>
      {activeFilters.map(([key, value]) => (
        <Badge key={key} variant="outline" className="gap-1 pr-1">
          <span className="font-medium">{getFilterLabel(key)}:</span>
          <span>{formatFilterValue(key, value)}</span>
          <Button
            variant="ghost"
            size="icon-sm"
            className="h-4 w-4 ml-1 hover:bg-destructive hover:text-destructive-foreground"
            onClick={() => onRemoveFilter(key)}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}
      <Button
        variant="ghost"
        size="sm"
        onClick={onClearAll}
        className="h-7 text-xs"
      >
        Clear all
      </Button>
    </div>
  )
}
